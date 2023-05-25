import {
  ForbiddenException,
  Injectable,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { AuthDto } from 'src/auth/dto';

@Injectable()
export class UserService {
  constructor(private authService: AuthService) {}

  async createUser(dto: AuthDto, res: Response) {
    const { access_token } =
      await this.authService.signup(dto);

    if (access_token) {
      return res.redirect('/sessions/new');
    }
  }
}
