import { Base } from "src/utils/base.entity";
import { Entity, Column, OneToOne, OneToMany, ManyToMany } from "typeorm";

@Entity()
export class User extends Base {

   @Column()
   //username — имя пользователя, уникальная строка от 2 до 30 символов, обязательное поле.

   @Column()

   //about — ** информация о пользователе, строка от 2 до 200 символов.В качестве значения по умолчанию укажите для него строку: «Пока ничего не рассказал о себе».

   @Column()
   //avatar — ссылка на аватар.В качестве значения по умолчанию задайте https:;//i.pravatar.cc/300

   @Column()
   //email — адрес электронной почты пользователя, должен быть уникален.

   @Column();
   //password — пароль пользователя, строка.


   //связи
   //@OneToOne()

   //@OneToMany()

   //@ManyToMany()
   //wishes — список желаемых подарков.Используйте для него соответствующий тип связи.
   //offers — содержит список подарков, на которые скидывается пользователь.Установите для него подходящий тип связи.
   //wishlists;
}
