import { IsString, IsUrl, Length } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Base } from "src/utils/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity("Wishlist")
export class Wishlist extends Base {

   //name — название списка. Не может быть длиннее 250 символов и короче одного;
   @Column()
   @IsString()
   @Length(1, 250)
   name: string;

   //description — описание подборки, строка до 1500 символов;
   @Column()
   @IsString()
   @Length(1, 1500)
   description: string;

   //image — обложка для подборки;
   @Column()
   @IsString()
   @IsUrl()
   image: string;

   //не реализовано это тоже связь?
   //!items содержит набор ссылок на подарки.

   @ManyToOne(() => User, (users) => users.wishlists)
   owner: User;
}
