import {
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export class JwtGuard extends AuthGuard('jwt') {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
  ) {
    super();
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest();
    const token =
      this.extractTokenFromCookie(request);
    console.log('TOKEN: ', token);
    if (!token) {
      console.log('YOU ARE HERE!!')
      throw new UnauthorizedException();
    }
    const some = this.jwtService.decode(token);
    console.log('SOME: ', some);
    try {
      const payload =
        await this.jwtService.verifyAsync(token, {
          secret: this.config.get('JWT_SECRET'),
        });
      console.log('PAYLOAD: ', payload);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromCookie(
    request: Request,
  ): string | undefined {
    // console.log(
    //   'COOKIES: ',
    //   request.headers.cookie,
    // );
    const [type, token] =
      request.headers.cookie?.split('%20') ?? [];
    return type.includes('Bearer') ? token : undefined;
  }
}
