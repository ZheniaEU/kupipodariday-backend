import { Injectable } from "@nestjs/common";
import { ForbiddenException, NotFoundException, } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { FindOneOptions, Repository } from "typeorm";
import { CreateWishDto } from "./dto/create-wish.dto";
import { UpdateWishDto } from "./dto/update-wish.dto";
import { Wish } from "./entities/wish.entity";

@Injectable()
export class WishesService {
   constructor(
      @InjectRepository(Wish) private wishesRepository: Repository<Wish>
   ) { }

   async create(user: User, createWishDto: CreateWishDto) {

      const wish = this.wishesRepository.create({ owner: user, ...createWishDto, });

      await this.wishesRepository.save(wish);
      return {};
   }

   async findUserWishes(user: User) {

      const wishes = await this.wishesRepository.findBy({ owner: { id: user.id } });
      wishes.forEach(wish => {
         delete wish.owner.password;
      });
      return wishes;
   }

   async getLast() {

      const wishes = await this.wishesRepository.find({ take: 40, order: { createdAt: "desc" }, relations: { owner: true, offers: true } });

      wishes.forEach(wish => {
         delete wish.owner.password;
      });

      return wishes;
   }

   async getTop() {

      const wishes = await this.wishesRepository.find({ take: 20, order: { copied: "desc" }, relations: { owner: true, offers: true } });
      wishes.forEach(wish => {
         delete wish.owner.password;
      });

      return wishes;
   }

   async findOne(id: number) {

      const wish = await this.wishesRepository.findOne({ where: { id }, relations: { owner: true, offers: true } });

      if (!wish) {
         throw new NotFoundException();
      }
      delete wish.owner.password;

      return wish;
   }

   async findOneQuery(options: FindOneOptions<Wish>) {

      const wish = await this.wishesRepository.findOne(options);

      if (!wish) {
         throw new NotFoundException("не удалось найти такие wishes");
      }
      return wish;
   }

   async update(user: User, id: number, updateWishDto: UpdateWishDto) {

      const wish = await this.wishesRepository.findOne({ where: { id, owner: { id: user.id } }, relations: { owner: true, offers: true } });

      if (!wish) {
         throw new NotFoundException();
      }

      if (wish.offers.length !== 0 && wish.reised !== 0) {
         throw new ForbiddenException("Обновление невозможно");
      }

      delete wish.offers;
      delete wish.owner;

      const updatedWish = { ...wish, ...updateWishDto };

      await this.wishesRepository.update({ id }, updatedWish);
      return {};
   }

   async remove(user: User, id: number) {

      const wish = await this.wishesRepository.findOne({ where: { id, owner: { id: user.id } }, relations: { owner: true, offers: true } });

      if (!wish) {
         throw new NotFoundException();
      }

      await this.wishesRepository.delete({ id });

      delete wish.owner.password;

      return wish;
   }

   async copy(user: User, id: number) {

      const wish = await this.wishesRepository.findOne({
         where: { id }
      });

      if (!wish) {
         throw new NotFoundException();
      }
      return await this.create(user, { name: wish.name, description: wish.description, image: wish.image, link: wish.link, price: wish.price });
   }

   async updateReised(id: number, reised: number) {

      const wish = await this.wishesRepository.findOne({ where: { id } });

      if (!wish) {
         throw new NotFoundException();
      }

      return this.wishesRepository.update({ id }, { reised });
   }

   async getManyById(arrayOfId: Array<number>) {
      return await this.wishesRepository.find({ where: arrayOfId.map((id) => ({ id })) });
   }
}
