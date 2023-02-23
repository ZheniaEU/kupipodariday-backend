import { Controller, Get, Body, Patch } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Req } from "@nestjs/common/decorators";
import { User } from "./entities/user.entity";


// import { UseGuards } from "@nestjs/common/decorators";
// import { JwtGuard } from "src/auth/guarsd/jwt.guard";


//гарду включать в самом конце после тестов
//@UseGuards(JwtGuard)
@Controller("users")
export class UsersController {
   constructor(private readonly usersService: UsersService) { }
   //users
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

   //PATCH/users/me
   // @Patch("me")
   // async updateUser(@Req() data, @Body() updateUserDto: UpdateUserDto) {
   //    return await this.usersService.updateUser(data.user.id, updateUserDto);
   // }

   // @Patch('me')
   // async updateAuthUser(@Req() { user }: { user: User; }, @Body() dto: UpdateUserDto): Promise<User> {
   //    return await this.usersService.updateUser(user.id, dto);
   // }

   @Patch("me")
   async updateUser(@Req() { user }: { user: User; }, @Body() updateUserDto: UpdateUserDto) {
      return await this.usersService.updateUser(user.id, updateUserDto);
   }
   // @Patch("me")


   // @Get("me/wishes")


   // @Get("me/wishlists")


   // @Get(":username")

   // @Post("find")


   // @Get(":username/wishes")

}
