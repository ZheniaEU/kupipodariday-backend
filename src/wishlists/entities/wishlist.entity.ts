import { Base } from "src/utils/base.entity";

export class Wishlist extends Base {
   @Column()
   //name — название списка. Не может быть длиннее 250 символов и короче одного;

   @Column()
   //description — описание подборки, строка до 1500 символов;

   @Column()
   //image — обложка для подборки;

   @Column();
   //items содержит набор ссылок на подарки.

   //связи
   //@OneToOne()

   //@OneToMany()

   //@ManyToMany()
}
