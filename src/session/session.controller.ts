import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthDto } from 'src/auth/dto';
import { SessionService } from './session.service';

@Controller('sessions')
export class SessionController {
  constructor(
    private sessionService: SessionService,
  ) {}

  @Get('new')
  @Render('sessions/new')
  newSession() {
    return;
  }

  @Post()
  createSession(
    @Body() dto: AuthDto,
    @Res() res: Response,
  ) {
    return this.sessionService.createSession(
      dto,
      res,
    );
  }
}
