import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { OffersService } from "./offers.service";
import { CreateOfferDto } from "./dto/create-offer.dto";
import { UseGuards } from "@nestjs/common/decorators/core/use-guards.decorator";
import { JwtGuard } from "src/auth/guarsd/jwt.guard";
import { Req } from "@nestjs/common/decorators/http/route-params.decorator";
import { RequestUser } from "src/types/user";
import { HttpCode } from "@nestjs/common/decorators";
import { HttpStatus } from "@nestjs/common/enums";

@UseGuards(JwtGuard)
@Controller("offers")
export class OffersController {
   constructor(private readonly offersService: OffersService) { }

   @HttpCode(HttpStatus.CREATED)
   @Post()
   async create(@Body() createOfferDto: CreateOfferDto, @Req() req: RequestUser) {
      return this.offersService.create(req.user, createOfferDto);
   }

   @Get()
   async find() {
      return await this.offersService.findAll();
   }

   @Get(":id")
   async findOne(@Param("id") id: number) {
      return await this.offersService.findOne(id);
   }
}
