import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LinksService } from '../services/links.service';
import { CreateLinkDto } from '../dto/create-link.dto';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('links')
export class LinksController {
  constructor(private readonly links: LinksService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post()
  create(@Req() req: Request, @Body() createLinkDto: CreateLinkDto) {
    return this.links.create(req, createLinkDto);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('/user')
  getUserLinks(@Req() req: Request) {
    return this.links.getUserLinks(req);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.links.findAll();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get(':short_url')
  findOne(@Param('id') short_url: string) {
    return this.links.findOne(short_url);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.links.remove(+id);
  }
}
