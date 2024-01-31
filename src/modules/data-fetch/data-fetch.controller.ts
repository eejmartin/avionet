import { Controller, Get } from '@nestjs/common';
import { DataFetchService } from './data-fetch.service';

@Controller('data-fetch')
export class DataFetchController {
  constructor(private readonly dataFetchService: DataFetchService) {}

  @Get()
  fetchData() {
    return this.dataFetchService.fetchData();
  }
}
