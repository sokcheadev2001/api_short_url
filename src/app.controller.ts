import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':url')
  async urlRedirect(@Res() res, @Param('url') url) {
    return await this.appService.urlRedirect(res, url);
  }
}
