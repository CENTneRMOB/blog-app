import {
  Controller,
  Get,
  UseGuards,
  Render,
  Redirect,
  Res,
  Post,
  Body,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
// import { GetUser } from '../auth/decorator';
// import { User } from '@prisma/client';
// import { AuthService } from '../auth/auth.service';
import { AuthDto } from 'src/auth/dto';
import { UserService } from './user.service';
import { Response } from 'express';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('new')
  @Render('users/new')
  newUser() {
    return;
  }

  @Post()
  createUser(
    @Body() dto: AuthDto,
    @Res() res: Response,
  ) {
    return this.userService.createUser(dto, res);
  }
}
