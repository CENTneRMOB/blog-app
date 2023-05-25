import {
  Controller,
  Post,
  UseGuards,
  Body,
  Render,
  Get,
  Query,
  Param,
  Patch,
  Redirect,
  Delete,
} from '@nestjs/common';
import { RecordDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { RecordService } from './record.service';

@UseGuards(JwtGuard)
@Controller('posts')
export class RecordController {
  constructor(
    private recordService: RecordService,
  ) {}

  @Get()
  @Render('posts/index')
  findAll(
    @Query()
    query: {
      page: string;
      limit?: string;
    },
  ) {
    return this.recordService.getRecords(query);
  }

  @Redirect('/posts')
  @Post()
  createPost(@Body() dto: RecordDto) {
    return this.recordService.createPost(dto);
  }

  @Redirect('/posts')
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.recordService.deletePost(id);
  }

  @Get('new')
  @Render('posts/new')
  newPost() {
    return;
  }

  @Get(':id')
  @Render('posts/view')
  findOne(@Param('id') id: string) {
    return this.recordService.getRecord(id);
  }

  @Redirect('/posts')
  @Patch(':id')
  updatePost(
    @Param('id') id: string,
    @Body() dto: RecordDto,
  ) {
    return this.recordService.updateRecord(
      id,
      dto,
    );
  }

  @UseGuards(JwtGuard)
  @Get(':id/edit')
  @Render('posts/edit')
  editPost(@Param('id') id: string) {
    return this.recordService.getRecord(id);
  }
}
