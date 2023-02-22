import { Injectable } from "@nestjs/common";
//import { UsersService } from "src/users/users.service";

// заглушка
@Injectable()
export class AuthService {

   async validatePassword(user: any, password: any) {
      if (user && password)
         return true;
   }
}

// из документации неста
// @Injectable()
// export class AuthService {
//    constructor(private usersService: UsersService) { }

//    async validateUser(username: string, pass: string): Promise<any> {
//       const user = await this.usersService.findOne(username);
//       if (user && user.password === pass) {
//          const { password, ...result } = user;
//          return result;
//       }
//       return null;
//    }
// }
