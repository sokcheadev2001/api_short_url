import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('links')
// @UseGuards(AuthGuard)
export class LinksController {
  constructor(private readonly linksService: LinksService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Req() req, @Body() createLinkDto: CreateLinkDto) {
    return this.linksService.create(req, createLinkDto);
  }

  @UseGuards(AuthGuard)
  @Get('user')
  findByUser(@Req() req: Request) {
    return this.linksService.findByUser(req);
  }

  @Get()
  findAll() {
    return this.linksService.findAll();
  }

  @Get(':short_url')
  findOne(@Param('id') short_url: string) {
    return this.linksService.findOne(short_url);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linksService.remove(+id);
  }
}
