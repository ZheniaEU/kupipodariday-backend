import { Injectable } from "@nestjs/common";
import { NotFoundException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { WishesService } from "src/wishes/wishes.service";
import { Repository } from "typeorm";
import { CreateWishlistDto } from "./dto/create-wishlist.dto";
import { UpdateWishlistDto } from "./dto/update-wishlist.dto";
import { Wishlist } from "./entities/wishlist.entity";

@Injectable()
export class WishlistsService {
   constructor(
      @InjectRepository(Wishlist) private wishlistRepository: Repository<Wishlist>,
      private wishesService: WishesService
   ) { }

   async create(user: User, createWishlistDto: CreateWishlistDto) {

      const wishes = await this.wishesService.getManyById(createWishlistDto.itemsId);
      const wishlist = this.wishlistRepository.create({ ...createWishlistDto, items: wishes, owner: user });
      delete wishlist.owner.password;

      return await this.wishlistRepository.save(wishlist);
   }

   async findAll() {
      const wishlist = await this.wishlistRepository.find({ relations: { owner: true, items: true } });
      wishlist.forEach(item => {
         delete item.owner.password;
      });
      return wishlist;
   }

   async findOne(id: number) {

      const wishlist = await this.wishlistRepository.findOne({ where: { id }, relations: { owner: true, items: true } });

      if (!wishlist) {
         throw new NotFoundException();
      }
      delete wishlist.owner.password;

      return wishlist;
   }

   async update(user: User, id: number, updateWishlistDto: UpdateWishlistDto) {

      const wishlist = await this.wishlistRepository.findOne({ where: { id }, relations: { owner: true } });

      if (!wishlist || wishlist.owner.id !== user.id) {
         throw new NotFoundException();
      }

      const wishes = await this.wishesService.getManyById(updateWishlistDto.itemsId);

      delete updateWishlistDto.itemsId;

      await this.wishlistRepository.save({ ...wishlist, ...updateWishlistDto, items: wishes });

      const newWishlist = await this.wishlistRepository.findOne({ where: { id }, relations: { owner: true, items: true } });
      delete newWishlist.owner.password;

      return newWishlist;
   }

   async remove(user: User, id: number) {

      const wishlist = await this.wishlistRepository.findOne({ where: { id }, relations: { owner: true, items: true } });

      if (!wishlist || wishlist.owner.id !== user.id) {
         throw new NotFoundException();
      }

      const removed = await this.wishlistRepository.remove(wishlist);
      delete removed.owner.password;

      return removed;
   }
}
