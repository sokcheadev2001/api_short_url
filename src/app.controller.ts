import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiQuery } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':url')
  @ApiQuery({ name: 'url', required: true })
  async urlRedirect(@Res() res, @Param('url') url) {
    return await this.appService.urlRedirect(res, url);
  }
}
