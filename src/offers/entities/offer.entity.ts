import { IsBoolean, IsNumber } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Base } from "src/utils/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity("Offer")
export class Offer extends Base {

   //amount — сумма заявки, округляется до двух знаков после запятой;
   @Column({
      scale: 2
   })
   @IsNumber()
   amount: number;

   //hidden — флаг, который определяет показывать ли информацию о скидывающемся в списке. По умолчанию равен false.
   @Column({
      default: false,
   })
   @IsBoolean()
   hidden: boolean;

   //связи
   //@OneToOne()
   @ManyToOne(() => User, (user) => user.offers)
   user: User;
   //@OneToMany()

   //@ManyToMany()
   // @Column()
   //user содержит id желающего скинуться;
   // это ссылка?

   //   @Column()
   // это ссылка?
   //item содержит ссылку на товар;
}
