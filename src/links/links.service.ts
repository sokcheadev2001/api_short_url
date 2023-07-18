import { Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
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
    newLink.user_id = user_id;
    newLink.ip = ip;
    return await this.linksRepository.save(newLink);
  }

  async generateShortUrl() {
    return await nanoid(10);
  }

  findAll() {
    return `This action returns all links`;
  }

  findOne(id: number) {
    return `This action returns a #${id} link`;
  }

  update(id: number, updateLinkDto: UpdateLinkDto) {
    return `This action updates a #${id} link`;
  }

  remove(id: number) {
    return `This action removes a #${id} link`;
  }
}
