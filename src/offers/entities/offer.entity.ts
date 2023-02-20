import { Base } from "src/utils/base.entity";
import { Column } from "typeorm";

export class Offer extends Base {
   @Column()
   //user содержит id желающего скинуться;

   @Column()
   //item содержит ссылку на товар;

   @Column()
   //amount — сумма заявки, округляется до двух знаков после запятой;

   @Column();
   //hidden — флаг, который определяет показывать ли информацию о скидывающемся в списке. По умолчанию равен false.


   //связи
   //@OneToOne()

   //@OneToMany()

   //@ManyToMany()
}
