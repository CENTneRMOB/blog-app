import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class RecordDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  user: string;
}
