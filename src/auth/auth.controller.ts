import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
   constructor(private readonly authService: AuthService) { }
}

// сразу накинуть паспорт, чтобы не писать создание пользователя 2 раз
// простейшие энпоинты, раскидать все эндпоинты по файлам
// хеш
// докрутить энпоинты
// вопрос про дто? когда их делать?
