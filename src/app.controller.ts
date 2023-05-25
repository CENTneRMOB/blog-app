import {
  Get,
  Controller,
  Render,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from './auth/decorator';
import { User } from '@prisma/client';
import { Request } from 'express';
import { JwtGuard } from './auth/guard';

@UseGuards(JwtGuard)
@Controller()
export class AppController {
  @Get()
  @Render('layouts/application')
  root(@Req() req: Request) {
    return;
  }
}
