// //! это пример
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from "passport-jwt";
// import { AuthService } from './auth.service';
// import { JwtPayload } from './jwt-payload.interface';

// // после логина
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//    constructor(private authService: AuthService) {
//       super({
//          // получаем готовый токен из headers
//          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//          secretOrKey: process.env.JWT_SECRET,
//       });
//    }

//    async validate(payload: JwtPayload) {
//       const user = await this.authService.validateUserById(payload.userId);
//       if (!user) {
//          throw new UnauthorizedException();
//       }
//       return user;
//    }
// }
