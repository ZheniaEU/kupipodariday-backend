
import { Length } from "class-validator";
import { IsEmail, IsNotEmpty, IsString, IsUrl } from "class-validator/types/decorator/decorators";
import { Base } from "src/utils/base.entity";
import { Entity, Column, OneToOne, OneToMany, ManyToMany } from "typeorm";

@Entity()
export class User extends Base {

   //username — имя пользователя, уникальная строка от 2 до 30 символов, обязательное поле.
   @Column({
      unique: true
   })
   @Length(2, 30)
   @IsNotEmpty()
   username: string;

   //about — ** информация о пользователе, строка от 2 до 200 символов.В качестве значения по умолчанию укажите для него строку: «Пока ничего не рассказал о себе».
   @Column({
      default: "«Пока ничего не рассказал о себе»"
   })
   @Length(2, 200)
   about: string;

   //avatar — ссылка на аватар.В качестве значения по умолчанию задайте https:;//i.pravatar.cc/300
   @Column({
      default: "https:;//i.pravatar.cc/300"
   })
   @IsUrl()
   avatar: string;

   //email — адрес электронной почты пользователя, должен быть уникален.
   @Column({
      unique: true
   })
   @IsEmail()
   email: string;

   //password — пароль пользователя, строка.
   @Column()
   @IsString()
   @IsNotEmpty()
   password: string;


   //связи
   //@OneToOne()

   //@OneToMany()

   //@ManyToMany()
   //wishes — список желаемых подарков.Используйте для него соответствующий тип связи.
   //offers — содержит список подарков, на которые скидывается пользователь.Установите для него подходящий тип связи.
   //wishlists;
}
