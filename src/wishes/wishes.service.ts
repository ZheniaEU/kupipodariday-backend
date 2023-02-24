import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateWishDto } from "./dto/create-wish.dto";
import { UpdateWishDto } from "./dto/update-wish.dto";
import { Wish } from "./entities/wish.entity";

@Injectable()
export class WishesService {
   constructor(@InjectRepository(Wish) private wishesRepository: Repository<Wish>) { }

   async create(user: User, createWishDto: CreateWishDto) {

      const wish = this.wishesRepository.create({
         owner: user,
         ...createWishDto,
      });


      await this.wishesRepository.save(wish);

      return {};
   }

   findUserWishes(user: User) {
      return this.wishesRepository.findBy({ owner: { id: user.id } });
   }

   // findAll() {

   // }

   findOne(id: number) {
      return `This action returns a #${id} wish`;
   }

   update(id: number, updateWishDto: UpdateWishDto) {
      return `This action updates a #${id} wish`;
   }

   remove(id: number) {
      return `This action removes a #${id} wish`;
   }
}
