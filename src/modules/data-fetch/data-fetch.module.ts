import { Module } from '@nestjs/common';
import { DataFetchService } from './data-fetch.service';
import { DataFetchController } from './data-fetch.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    // TypeOrmModule.forFeature([

    // ]),
    HttpModule,
  ],
  providers: [DataFetchService],
  controllers: [DataFetchController],
  exports: [DataFetchService],
})
export class DataFetchModule {}
