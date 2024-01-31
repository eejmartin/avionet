import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class DataFetchService {
  constructor(private readonly httpService: HttpService) {}

  public async fetchData(): Promise<any> {
    return `This action fetch data`;
  }
}
