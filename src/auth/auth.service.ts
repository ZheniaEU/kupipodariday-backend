import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { HashService } from "src/hash/hash.service";
import { UsersService } from "src/users/users.service";
import { LoginResponse } from "./login-response.interface";

@Injectable()
export class AuthService {
   constructor(private usersService: UsersService, private hashService: HashService, private jwtService: JwtService) { }

   public async validateUser(username: string, password: string): Promise<boolean> {
      const user = await this.usersService.findOne({ username });

      return await this.hashService.compare(password, user.password);
   }

   public async auth(userId: number): Promise<LoginResponse> {
      const token = await this.jwtService.signAsync({ userId });
      return { access_token: token };
   }
}
