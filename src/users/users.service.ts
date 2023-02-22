import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
   constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
   ) { }

   // async findUserById(id: string): Promise<User> {
   //    return this.userRepository.findOne(id);
   // }

   async findUserByUsername(username: string): Promise<User> {
      return this.userRepository.findOne({ where: { username } });
   }

   async createUser(userData: Partial<User>): Promise<User> {
      const user = this.userRepository.create(userData);
      return this.userRepository.save(user);
   }

   async updateUser(user: User, updatedData: Partial<User>): Promise<User> {
      const updatedUser = this.userRepository.merge(user, updatedData);
      return this.userRepository.save(updatedUser);
   }

   async findUsers(query: string): Promise<User[]> {
      const users = await this.userRepository
         .createQueryBuilder("user")
         .where("LOWER(user.username) LIKE LOWER(:query)", { query: `%${query}%` })
         .getMany();
      return users;
   }
}
