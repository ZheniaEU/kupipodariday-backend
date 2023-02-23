import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HashService } from "src/hash/hash.service";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
   constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
      private readonly hashService: HashService,
   ) { }

   async createUser(userData: Partial<User>): Promise<User> {
      const password = await this.hashService.hash(userData.password);
      return await this.userRepository.save({ password: password, ...userData });
   }



   // async findUserById(id: string): Promise<User> {
   //    return this.userRepository.findOne(id);
   // }

   async findUserByUsername(username: string): Promise<User> {
      return this.userRepository.findOne({ where: { username } });
   }

   // async createUser(userData: Partial<User>): Promise<User> {
   //    const user = this.userRepository.create(userData);
   //    return this.userRepository.save(user);
   // }

   async updateUser(id: number, data: UpdateUserDto): Promise<User> {

      console.log(data);

      const user = await this.userRepository.findOneBy({ id });

      if (data.email && user.email !== data.email)
         throw new BadRequestException("шляпа");

      if (data.password)
         data.password = await this.hashService.hash(data.password);

      const updatedUser = { ...user, username: data?.username, password: data?.password, email: data?.email, about: data?.about, avatar: data?.avatar, };
      await this.userRepository.update(id, updatedUser);

      return await this.userRepository.findOneBy({ id });
   }


   // async findUsers(query: string): Promise<User[]> {
   //    const users = await this.userRepository
   //       .createQueryBuilder("user")
   //       .where("LOWER(user.username) LIKE LOWER(:query)", { query: `%${query}%` })
   //       .getMany();
   //    return users;
}
