import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateLinkDto {
  @ApiProperty()
  @IsNotEmpty()
  long_url: string;
}
