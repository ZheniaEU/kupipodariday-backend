import { Controller, Post, UseGuards, Req, Body } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { LocalGuard } from "./guarsd/local.guard";
import { LoginResponse } from "./login-response.interface";

import type { RequestUser } from "src/types/user";

@Controller()
export class AuthController {
   constructor(private authService: AuthService, private usersService: UsersService) { }

   // логин
   @UseGuards(LocalGuard)
   @Post("signin")
   async signin(@Req() req: RequestUser): Promise<LoginResponse> {
      return await this.authService.auth(req.user.id);
   }

   //регистрация
   @Post("signup")
   async signup(@Body() createUserDto: CreateUserDto): Promise<Omit<User, "password">> {

      const user = await this.usersService.createUser(createUserDto);
      return user;
   }
}
