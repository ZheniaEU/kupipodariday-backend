import { IsString, IsUrl, Length } from "class-validator";
import { Base } from "src/utils/base.entity";
import { Column } from "typeorm";

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

   //@Column(); связи*
   //items содержит набор ссылок на подарки.

   //связи
   //@OneToOne()

   //@OneToMany()

   //@ManyToMany()
}
