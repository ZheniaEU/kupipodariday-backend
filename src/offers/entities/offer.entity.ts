import { IsBoolean, IsNumber } from "class-validator";
import { Base } from "src/utils/base.entity";
import { Column } from "typeorm";

export class Offer extends Base {
   // @Column()
   //user содержит id желающего скинуться;
   // это ссылка?

   //   @Column()
   // это ссылка?
   //item содержит ссылку на товар;

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

   //@OneToMany()

   //@ManyToMany()
}
