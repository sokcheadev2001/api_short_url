import { Injectable } from '@nestjs/common';
import { LinksService } from './modules/links/services/links.service';

@Injectable()
export class AppService {
  constructor(private linksService: LinksService) {}
  async urlRedirect(res, shortUrl: string) {
    res.redirect(await this.linksService.getDirection(shortUrl));
  }
}
