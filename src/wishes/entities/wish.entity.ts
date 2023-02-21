import { IsDate, IsNotEmpty, IsNumber, IsString, IsUrl, Length } from "class-validator";
import { Base } from "src/utils/base.entity";
import { User } from "src/users/entities/user.entity";

import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("Wish")
export class Wish extends Base {

   //name — название подарка. Не может быть длиннее 250 символов и короче одного.
   @Column()
   @Length(1, 250)
   @IsNotEmpty()
   @IsString()
   name: string;

   //link — ссылка на интернет-магазин, в котором можно приобрести подарок, строка
   @Column()
   @IsUrl()
   @IsString()
   link: string;

   //image -ссылка на изображение подарка, строка. Должна быть валидным URL.
   @Column()
   @IsUrl()
   @IsString()
   image: string;

   //price — стоимость подарка, с округлением до сотых, число.
   @Column({
      scale: 2
   })
   @IsNumber()
   price: number;

   //raised — сумма предварительного сбора или сумма, которую пользователи сейчас готовы скинуть на подарок. Также округляется до сотых.
   @Column({
      scale: 2
   })
   @IsNumber()
   reised: number;

   //description — строка с описанием подарка длиной от 1 и до 1024 символов.
   @Column()
   @IsString()
   @Length(1, 1024)
   desctiption: string;


   @ManyToOne(() => User, (owner) => owner.wishes)
   owner: User;
   //owner — ссылка на пользователя, который добавил пожелание подарка.
   // @Column()
   // owner: string; // это связи?

   //offers — массив ссылок на заявки скинуться от других пользователей.
   // @Column()
   // это связи?


   //copied — содержит cчётчик тех, кто скопировал подарок себе. Целое десятичное число.
   // @Column();

   // это связи?

   //связи
   //@OneToOne()

   //@OneToMany()

   //@ManyToMany()
}
