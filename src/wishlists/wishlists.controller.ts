import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { WishlistsService } from "./wishlists.service";
import { CreateWishlistDto } from "./dto/create-wishlist.dto";
import { UpdateWishlistDto } from "./dto/update-wishlist.dto";
import { UseGuards } from "@nestjs/common/decorators";
import { JwtGuard } from "src/auth/guarsd/jwt.guard";

@UseGuards(JwtGuard)
@Controller("wishlists")
export class WishlistsController {
   constructor(private readonly wishlistsService: WishlistsService) { }

   @Post()
   create(@Body() createWishlistDto: CreateWishlistDto) {
      return this.wishlistsService.create(createWishlistDto);
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
   update(
      @Param("id") id: string,
      @Body() updateWishlistDto: UpdateWishlistDto
   ) {
      return this.wishlistsService.update(+id, updateWishlistDto);
   }

   @Delete(":id")
   remove(@Param("id") id: string) {
      return this.wishlistsService.remove(+id);
   }
}
