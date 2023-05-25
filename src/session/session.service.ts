import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { AuthDto } from 'src/auth/dto';

@Injectable()
export class SessionService {
  constructor(private authService: AuthService) {}

  async createSession(
    dto: AuthDto,
    res: Response,
  ) {
    const { access_token } =
      await this.authService.signin(dto);

    res.cookie(
      'blog_cookie',
      `Bearer ${access_token}`,
      {
        maxAge: 1800000,
        httpOnly: true,
      },
    );

    res.redirect('/');
  }
}
