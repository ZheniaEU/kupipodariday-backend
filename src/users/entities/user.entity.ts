
import { IsEmail, IsNotEmpty, IsString, IsUrl, Length } from "class-validator";
import { Offer } from "src/offers/entities/offer.entity";
import { Base } from "src/utils/base.entity";
import { Wish } from "src/wishes/entities/wish.entity";
import { Wishlist } from "src/wishlists/entities/wishlist.entity";
import { Entity, Column, OneToMany } from "typeorm";

@Entity("User")
export class User extends Base {

   //username — имя пользователя, уникальная строка от 2 до 30 символов, обязательное поле.
   @Column({
      unique: true
   })
   @Length(2, 30)
   @IsString()
   @IsNotEmpty()
   username: string;

   //about — ** информация о пользователе, строка от 2 до 200 символов.В качестве значения по умолчанию укажите для него строку: «Пока ничего не рассказал о себе».
   @Column({
      default: "«Пока ничего не рассказал о себе»"
   })
   @Length(2, 200)
   @IsString()
   about: string;

   //avatar — ссылка на аватар.В качестве значения по умолчанию задайте https:;//i.pravatar.cc/300
   @Column({
      default: "https:;//i.pravatar.cc/300"
   })
   @IsString()
   @IsUrl()
   avatar: string;

   //email — адрес электронной почты пользователя, должен быть уникален.
   @Column({
      unique: true
   })
   @IsString()
   @IsEmail()
   email: string;

   //password — пароль пользователя, строка.
   @Column()
   @IsString()
   @IsNotEmpty()
   password: string;

   //wishes — список желаемых подарков.Используйте для него соответствующий тип связи.
   @OneToMany(() => Wish, (wishes) => wishes.owner)
   wishes: Wish[];

   //offers — содержит список подарков, на которые скидывается пользователь.Установите для него подходящий тип связи.
   @OneToMany(() => Offer, (offer) => offer.user)
   offers: Offer[];

   //wishlists -содержит список вишлистов, которые создал пользователь. Установите для него подходящий тип связи.
   @OneToMany(() => Wishlist, (wishlists) => wishlists.owner)
   wishlists: Wishlist[];
}
