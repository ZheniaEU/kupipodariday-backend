import { Injectable } from "@nestjs/common";
import { ForbiddenException, NotFoundException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { WishesService } from "src/wishes/wishes.service";
import { Repository } from "typeorm";
import { CreateOfferDto } from "./dto/create-offer.dto";
import { Offer } from "./entities/offer.entity";

@Injectable()
export class OffersService {
   constructor(
      @InjectRepository(Offer)
      private offersRepository: Repository<Offer>,
      private wishesService: WishesService
   ) { }

   async create(user: User, createOfferDto: CreateOfferDto) {

      const wish = await this.wishesService.findOneQuery({ where: { id: createOfferDto.itemId }, relations: { offers: true, owner: true } });

      if (wish.owner.id === user.id) {
         throw new ForbiddenException("нельзя сюда");
      }

      const reised = createOfferDto.amount + wish.reised;

      if (reised > wish.price) {
         throw new ForbiddenException("очень много денег даешь, надо меньше");
      }

      await this.wishesService.updateReised(wish.id, reised);

      const offer = this.offersRepository.create({
         amount: createOfferDto.amount, hidden: createOfferDto.hidden, item: wish, user
      });
      this.offersRepository.save(offer);

      return {};
   }

   async findAll() {

      const offers = await this.offersRepository.find({ relations: { item: true, user: true } });

      offers.forEach(offer => {
         delete offer.user.password;
      });

      return offers;
   }

   async findOne(id: number) {

      const offer = await this.offersRepository.findOne({ where: { id }, relations: { item: true, user: true } });

      if (!offer) {
         throw new NotFoundException();
      }
      delete offer.user.password;

      return offer;
   }
}
