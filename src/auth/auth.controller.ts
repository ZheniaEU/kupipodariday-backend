import { Controller, Post, UseGuards, Req, Body } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { User } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { LocalGuard } from "./guarsd/local.guard";
import { LoginResponse } from "./login-response.interface";

import type { RequestUser } from "src/types/express";

@Controller("auth")
export class AuthController {
   constructor(private authService: AuthService, private usersService: UsersService) { }

   // логин
   @UseGuards(LocalGuard)
   @Post("signin")
   public async signin(@Req() req: RequestUser): Promise<LoginResponse> {
      return await this.authService.auth(req.user.id);
   }

   //регистрация
   @Post("signup")
   public async signup(@Body() createUserDto: CreateUserDto): Promise<Omit<User, "password">> {
      const user = await this.usersService.createUser(createUserDto);
      delete user.password;

      return user;
   }
}
// import { Controller, Get, UseGuards, Req } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { AuthService } from './auth.service';

// @Controller('oauth')
// export class OAuthController {
//    constructor(private authService: AuthService) { }

//    @UseGuards(AuthGuard('yandex'))
//    @Get('yandex')
//    yandex() {
//       /* Этот метод можно оставить пустым, так как Passport перенаправит пользователя в Яндекс */
//    }

//    @UseGuards(AuthGuard('yandex'))
//    @Get('yandex/callback')
//    yandexCallback(@Req req) {
//       return this.authService.auth(req.user);
//    }
// }

//контроллер
// import { Controller, Post, UseGuards, Req } from '@nestjs/common';
// import { UsersService } from '../users/users.service';
// import { AuthService } from './auth.service';
// import { LocalGuard } from '../guards/local.guard';
// import { CreateUserDto } from '../users/dto/create-user.dto';

// @Controller('auth')
// export class AuthController {
//    constructor(
//       private usersService: UsersService,
//       private authService: AuthService,
//    ) { }

//    /**
//     * Стратегия local автоматически достанет username и password из тела запроса
//     * Если пароль будет верным, данные пользователя окажутся в объекте req.user
//     */
//    @UseGuards(LocalGuard)
//    @Post('signin')
//    signin(@Req req) {
//       /* Генерируем для пользователя JWT токен */
//       return this.authService.auth(req.user);
//    }

//    @Post('signup')
//    signup(@Body() createUserDto: CreateUserDto) {
//       /* При регистрации, создаём пользователя и генерируем для него токен */
//       const user = this.usersService.create(createUserDto);

//       return this.authService.auth(user);
//    }
// }

// стратегия
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, Profile } from 'passport-yandex';
// import { AuthService } from './auth.service';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class YandexStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     private authService: AuthService,
//     configService: ConfigService,
//   ) {
//     /* В конструктор родителя мы можем передать параметры для стратегии */
//     super({
//       clientID: configService.get<stirng>('YANDEX_CLIENT_ID'),
//       clientSecret: configService.get<stirng>('YANDEX_CLIENT_SECRET'),
//       callbackURL: configService.get<stirng>('YANDEX_REDIRECT_URI'),
//     });
//   }

//   async validate(accessToken: string, refreshToken: string, profile: Profile) {
//     const user = await this.authService.validateFromYandex(profile);

//     if (!user) {
//       throw new UnauthorizedException();
//     }

//     return user;
//   }
// }
