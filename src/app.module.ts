import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentModule } from './config/env/environment.module';
import { DatabaseModule } from './config/database/database.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [EnvironmentModule, DatabaseModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
