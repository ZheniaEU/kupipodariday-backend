import { Controller, Get, Body, Patch } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Param, Post, Req, UseGuards } from "@nestjs/common/decorators";
import { JwtGuard } from "src/auth/guarsd/jwt.guard";
import { RequestUser } from "src/types/user";
import { FindManyUserDto } from "./dto/find-many-user.dto";

@UseGuards(JwtGuard)
@Controller("users")
export class UsersController {
   constructor(private readonly usersService: UsersService) { }

   @Get("me")
   getUser(@Req() req: RequestUser) {
      delete req.user.password;
      return req.user;
   }

   @Patch("me")
   async updateUser(@Req() req: RequestUser, @Body() updateUserDto: UpdateUserDto) {
      return await this.usersService.updateUser(req.user, updateUserDto);
   }

   @Get("me/wishes")
   async getWishes(@Req() req: RequestUser) {
      return await this.usersService.getWishes(req.user);
   }


   @Get(":username")
   async getUserByUsername(@Param() { username }: { username: string; }) {
      return await this.usersService.findOne({ username });
   }

   @Get(":username/wishes")
   async getWishesByUser(@Param() { username }: { username: string; }) {
      const user = await this.usersService.findOne({ username });
      return await this.usersService.getWishes(user);
   }

   @Post("find")
   async findUser(@Body() findManyUserDto: FindManyUserDto) {
      return await this.usersService.findMany(findManyUserDto.query);
   }
}
