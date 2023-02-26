import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { WishesService } from "./wishes.service";
import { CreateWishDto } from "./dto/create-wish.dto";
import { UpdateWishDto } from "./dto/update-wish.dto";
import { HttpCode, Req, UseGuards } from "@nestjs/common/decorators";
import { JwtGuard } from "src/auth/guarsd/jwt.guard";
import { RequestUser } from "src/types/user";
import { HttpStatus } from "@nestjs/common/enums";

@Controller("wishes")
export class WishesController {
   constructor(private readonly wishesService: WishesService) { }

   @UseGuards(JwtGuard)
   @HttpCode(HttpStatus.CREATED)
   @Post()
   create(@Body() createWishDto: CreateWishDto, @Req() req: RequestUser) {
      return this.wishesService.create(req.user, createWishDto);
   }

   @Get("last")
   async getLast() {
      return await this.wishesService.getLast();
   }

   @Get("top")
   async getTop() {
      return await this.wishesService.getTop();
   }

   @UseGuards(JwtGuard)
   @Get(":id")
   findOne(@Param("id") id: string) {
      return this.wishesService.findOne(+id);
   }

   @UseGuards(JwtGuard)
   @Patch(":id")
   update(@Req() req: RequestUser, @Param("id") id: string, @Body() updateWishDto: UpdateWishDto) {
      return this.wishesService.update(req.user, +id, updateWishDto);
   }

   @UseGuards(JwtGuard)
   @Delete(":id")
   async remove(@Param("id") id: string, @Req() req: RequestUser) {
      return await this.wishesService.remove(req.user, +id);
   }

   @UseGuards(JwtGuard)
   @HttpCode(HttpStatus.CREATED)
   @Post(":id/copy")
   async copy(@Param("id") id: string, @Req() req: RequestUser) {
      return await this.wishesService.copy(req.user, +id);
   }
}
