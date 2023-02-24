import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateOfferDto } from "./dto/create-offer.dto";
import { Offer } from "./entities/offer.entity";

@Injectable()
export class OffersService {
   constructor(
      @InjectRepository(Offer)
      private offersRepository: Repository<Offer>,
   ) { }

   // async create(user:User,createOfferDto: CreateOfferDto) {
   //    const offer = this.offersRepository.create({ ...createOfferDto, user })

   //    await this.offersRepository.save(offer)

   //    return {}
   // }

}
