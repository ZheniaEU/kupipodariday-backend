import { IsString, IsUrl, Length } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Base } from "src/utils/base.entity";
import { Wish } from "src/wishes/entities/wish.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";

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

   @ManyToMany(() => Wish)
   @JoinTable()
   items: Wish[];

   //связи
   @ManyToOne(() => User, (users) => users.wishlists)
   owner: User;
}
