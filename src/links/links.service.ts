import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid/async';
@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link)
    private linksRepository: Repository<Link>,
  ) {}

  async create(req, createLinkDto: CreateLinkDto) {
    const user_id = req.user.id;
    const ip = req.ip;
    // Get Short Url for given url
    const short_url = await this.generateShortUrl();

    // Create new link
    const newLink = new Link();
    newLink.long_url = createLinkDto.long_url;
    newLink.short_url = short_url;
    newLink.user = user_id;
    newLink.ip = ip;

    return await this.linksRepository.save(newLink);
  }

  async getUserLinks(req) {
    const user_id = req.user.id;
    return await this.linksRepository.find({
      relations: {
        user: true,
      },
      where: {
        user: {
          id: user_id,
        },
      },
    });
  }

  async generateShortUrl() {
    return await nanoid(10);
  }

  async getDirection(short_url: string) {
    const link = await this.findOne(short_url);
    if (!link) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Link not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return link.long_url;
  }

  findAll() {
    return `This action returns all links`;
  }

  async findOne(short_url: string) {
    return await this.linksRepository.findOneBy({ short_url });
  }

  remove(id: number) {
    return `This action removes a #${id} link`;
  }
}
