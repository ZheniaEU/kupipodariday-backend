import { ConfigService } from "@nestjs/config";
import { Offer } from "src/offers/entities/offer.entity";
import { User } from "src/users/entities/user.entity";
import { Wish } from "src/wishes/entities/wish.entity";
import { Wishlist } from "src/wishlists/entities/wishlist.entity";

export const typeOrmConfig = (configService: ConfigService) => ({
   type: configService.get("DB_TYPE"),
   host: configService.get("DB_HOST"),
   port: configService.get("DB_PORT"),
   username: configService.get("DB_USERNAME"),
   password: configService.get("DB_PASSWORD"),
   database: configService.get("DB_DATABASE"),
   entities: [User, Wish, Wishlist, Offer],
   synchronize: configService.get("DB_SYNCHRONIZE"),
});
