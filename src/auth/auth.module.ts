import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "../users/users.module";
import { AuthController } from "../auth/auth.controller";
import { AuthService } from "../auth/auth.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { HashService } from "src/hash/hash.service";


@Module({
   imports: [
      PassportModule,
      UsersModule,
      ConfigModule,
      JwtModule.registerAsync({
         imports: [ConfigModule],
         useFactory: async (configService: ConfigService) => {
            return {
               secret: "top_secret",
               signOptions: { expiresIn: "30d" },
            };
         },
         inject: [ConfigService],
      }),
   ],
   providers: [AuthService, JwtStrategy, LocalStrategy, HashService],
   exports: [AuthService],
   controllers: [AuthController],
})
export class AuthModule { }
