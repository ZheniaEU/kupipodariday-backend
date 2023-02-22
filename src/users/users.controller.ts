import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Req } from "@nestjs/common/decorators";

// import { UseGuards } from "@nestjs/common/decorators";
// import { JwtGuard } from "src/auth/guarsd/jwt.guard";


//гарду включать в самом конце после тестов
//@UseGuards(JwtGuard)
@Controller("users")
export class UsersController {
   constructor(private readonly usersService: UsersService) { }
   //users
   // PATCH/users/me
   // GET/users/me/wishes
   // GET/users/{username}
   // GET/users/{username}/wishes
   // POST/users/find

   // GET/users/me
   @Get("me")
   getUser(@Req() req: Express.Request) {
      return req.user;
   }
   // getUser(@Req() { user }: { user: User; }) {
   //    return user;
   // }


   @Patch("me")
   async updateUser(@Req() data, @Body() updateUserDto: UpdateUserDto) {
      return await this.usersService.updateUser(data.user.id, updateUserDto);
   }

   // @Patch("me")


   // @Get("me/wishes")


   // @Get("me/wishlists")


   // @Get(":username")

   // @Post("find")


   // @Get(":username/wishes")

}
