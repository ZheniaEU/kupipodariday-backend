import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { WishesService } from "./wishes.service";
import { CreateWishDto } from "./dto/create-wish.dto";
import { UpdateWishDto } from "./dto/update-wish.dto";
import { HttpCode, Req, UseGuards } from "@nestjs/common/decorators";
import { JwtGuard } from "src/auth/guarsd/jwt.guard";
import { RequestUser } from "src/types/user";
import { HttpStatus } from "@nestjs/common/enums";

@UseGuards(JwtGuard)
@Controller("wishes")
export class WishesController {
   constructor(private readonly wishesService: WishesService) { }

   @HttpCode(HttpStatus.CREATED)
   @Post()
   create(@Body() createWishDto: CreateWishDto, @Req() req: RequestUser) {

      return this.wishesService.create(req.user, createWishDto);
   }

   // @Get()
   // findAll() {
   //    return this.wishesService.findAll();
   // }

   @Get(":id")
   findOne(@Param("id") id: string) {
      return this.wishesService.findOne(+id);
   }

   @Patch(":id")
   update(@Param("id") id: string, @Body() updateWishDto: UpdateWishDto) {
      return this.wishesService.update(+id, updateWishDto);
   }

   @Delete(":id")
   remove(@Param("id") id: string) {
      return this.wishesService.remove(+id);
   }
}
