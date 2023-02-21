import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UsersModule } from "./users/users.module";
import { WishesModule } from "./wishes/wishes.module";
import { WishlistsModule } from "./wishlists/wishlists.module";
import { OffersModule } from "./offers/offers.module";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/entities/user.entity";
import { Offer } from "./offers/entities/offer.entity";
import { Wish } from "./wishes/entities/wish.entity";
import { Wishlist } from "./wishlists/entities/wishlist.entity";
import { ConfigModule } from "@nestjs/config";
//import { ConfigModule, ConfigService } from "@nestjs/config";
//import { HashModule } from "./hash/hash.module";
//import { typeOrmConfig } from "./config/config";
//import { AppService } from "./app.service";

// @Module({
//    imports: [ConfigModule.forRoot(),
//    TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: typeOrmConfig
//    }),
//       UsersModule, WishesModule, WishlistsModule, OffersModule, AuthModule, HashModule,
//    ],
//    controllers: [AppController],
//    providers: [AppService],
// })
// export class AppModule { }


@Module({
   imports: [
      ConfigModule.forRoot({ isGlobal: true }),
      TypeOrmModule.forRoot({
         type: "postgres",
         host: "localhost",
         port: 5432,
         username: "student",
         password: "student",
         database: "kupipodariday",
         //schema: "kupipodariday",
         entities: [User, Offer, Wish, Wishlist],
         synchronize: true,
      }),
      UsersModule,
      WishesModule,
      WishlistsModule,
      OffersModule,
      AuthModule,
   ],
   controllers: [AppController],
   providers: [],
})
export class AppModule { }
