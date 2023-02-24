import { BadRequestException, Injectable, ConflictException } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { HashService } from "src/hash/hash.service";
import { WishesService } from "src/wishes/wishes.service";
import { FindOptionsWhere, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
   constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
      private readonly hashService: HashService,
      private readonly wishesService: WishesService
   ) { }

   public async createUser(userData: CreateUserDto): Promise<User> {
      const user = await this.userRepository.findOneBy([{ username: userData.username }, { email: userData.email }]);

      if (user) {
         throw new ConflictException("Пользователь с таким email или username уже зарегистрирован");
      }

      const password = await this.hashService.hash(userData.password);
      return await this.userRepository.save({ ...userData, password });
   }

   public async updateUser(oldUser: User, data: UpdateUserDto): Promise<User> {
      const userWithThisName = await this.userRepository.findOneBy({ username: data.username });

      if (userWithThisName && oldUser.username !== data.username) {
         throw new BadRequestException("такой username уже занят");
      }

      if (data.email && oldUser.email !== data.email) {
         throw new BadRequestException("шляпа");
      }

      if (data.password) {
         data.password = await this.hashService.hash(data.password);
      }


      await this.userRepository.update(oldUser.id, {
         ...oldUser,
         username: data?.username,
         password: data?.password,
         email: data?.email,
         about: data?.about,
         avatar: data?.avatar,
      });


      const updatedUser = await this.userRepository.findOneBy({ id: oldUser.id });
      delete updatedUser.password;
      return updatedUser;
   }

   public async findById(id: number): Promise<User> {
      return await this.userRepository.findOneBy({ id });
   }

   public async findOne(options: FindOptionsWhere<User>): Promise<User> {
      const user = await this.userRepository.findOneBy(options);

      if (!user) {
         throw new NotFoundException("Пользователь не найден");
      }
      return user;
   }

   public async getWishes(user: User) {
      return await this.wishesService.findUserWishes(user);
   }

   public async findMany(query: string) {
      const users = await this.userRepository.find({
         where: [{ username: query }, { email: query }],
      });

      if (users.length !== 0) {
         const usersWithoutPass = users.map((item) => {
            const { password, ...rest } = item;

            return rest;
         });

         return usersWithoutPass;
      }

      return users;
   }
}
