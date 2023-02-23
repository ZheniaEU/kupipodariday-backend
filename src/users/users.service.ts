import { BadRequestException, Injectable, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HashService } from "src/hash/hash.service";
import { FindOptionsWhere, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
   constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
      private readonly hashService: HashService
   ) { }

   public async createUser(userData: CreateUserDto): Promise<User> {
      const user = await this.userRepository.findOneBy([{ username: userData.username }, { email: userData.email }]);

      if (user) {
         throw new ConflictException("Пользователь с таким email или username уже зарегистрирован");
      }

      const password = await this.hashService.hash(userData.password);
      return await this.userRepository.save({ ...userData, password });
   }

   public async updateUser(id: number, data: UpdateUserDto): Promise<User> {

      const user = await this.userRepository.findOneBy({ id });

      if (data.email && user.email !== data.email) {
         throw new BadRequestException("шляпа");
      }

      if (data.password) {
         data.password = await this.hashService.hash(data.password);
      }

      const updatedUser = {
         ...user,
         username: data?.username,
         password: data?.password,
         email: data?.email,
         about: data?.about,
         avatar: data?.avatar,
      };
      await this.userRepository.update(id, updatedUser);

      return await this.userRepository.findOneBy({ id });
   }

   public async findById(id: number): Promise<User> {
      return await this.userRepository.findOneBy({ id });
   }

   public async findOne(options: FindOptionsWhere<User>): Promise<User> {
      return await this.userRepository.findOneBy(options);
   }
}
