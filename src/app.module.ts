import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UsersModule } from "./users/users.module";
import { WishesModule } from "./wishes/wishes.module";
import { WishlistsModule } from "./wishlists/wishlists.module";
import { OffersModule } from "./offers/offers.module";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { typeOrmConfig } from "./config/config";

@Module({
   imports: [
      ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env.example" }),
      TypeOrmModule.forRootAsync({
         imports: [ConfigModule],
         inject: [ConfigService],
         useFactory: typeOrmConfig
      }),
      UsersModule,
      WishesModule,
      WishlistsModule,
      OffersModule,
      AuthModule
   ],
   controllers: [AppController],
   providers: []
})
export class AppModule { }
