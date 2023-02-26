import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { WishlistsService } from "./wishlists.service";
import { CreateWishlistDto } from "./dto/create-wishlist.dto";
import { UpdateWishlistDto } from "./dto/update-wishlist.dto";
import { HttpCode, Req, UseGuards } from "@nestjs/common/decorators";
import { JwtGuard } from "src/auth/guarsd/jwt.guard";
import { RequestUser } from "src/types/user";
import { HttpStatus } from "@nestjs/common/enums";

@UseGuards(JwtGuard)
@Controller("wishlistlists")
export class WishlistsController {
   constructor(private readonly wishlistsService: WishlistsService) { }

   @HttpCode(HttpStatus.CREATED)
   @Post()
   create(@Body() createWishlistDto: CreateWishlistDto, @Req() req: RequestUser) {
      return this.wishlistsService.create(req.user, createWishlistDto);
   }

   @Get()
   findAll() {
      return this.wishlistsService.findAll();
   }

   @Get(":id")
   findOne(@Param("id") id: string) {
      return this.wishlistsService.findOne(+id);
   }

   @Patch(":id")
   update(@Param("id") id: string, @Body() updateWishlistDto: UpdateWishlistDto, @Req() req: RequestUser) {
      return this.wishlistsService.update(req.user, +id, updateWishlistDto);
   }

   @Delete(":id")
   remove(@Param("id") id: string, @Req() req: RequestUser) {
      return this.wishlistsService.remove(req.user, +id);
   }
}
