import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { OffersService } from "./offers.service";
import { CreateOfferDto } from "./dto/create-offer.dto";
import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator";
import { JwtGuard } from "src/auth/guarsd/jwt.guard";
import { Req } from "@nestjs/common/decorators/http/route-params.decorator";
import { RequestUser } from "src/types/user";

@UseGuards(JwtGuard)
@Controller("offers")
export class OffersController {
   constructor(private readonly offersService: OffersService) { }

   //offers
   // POST/offers
   // GET/offers
   // GET/offers/{id}
   // @Post()
   // async create(@Body() createOfferDto: CreateOfferDto, @Req() req: RequestUser) {
   //    return this.offersService.create(req.user, createOfferDto);
   // }

}
