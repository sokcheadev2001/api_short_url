import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentModule } from './config/env/environment.module';
import { DatabaseModule } from './config/database/database.module';
@Module({
  imports: [EnvironmentModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
