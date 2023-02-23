import { IsBoolean, IsNumber } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Base } from "src/utils/base.entity";
import { Wish } from "src/wishes/entities/wish.entity";
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
   //user содержит id желающего скинуться;
   @ManyToOne(() => User, (user) => user.offers)
   user: User;

   //! тут какое-то каскадноу удаление
   //item содержит ссылку на товар;
   @ManyToOne(() => Wish, (wish) => wish.offers)
   item: Wish;
}
