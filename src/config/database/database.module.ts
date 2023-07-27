import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOption } from 'ormconfig';
@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOption)],
})
export class DatabaseModule {}
