import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Notifycation } from 'tasks/notifycation';

@Injectable()
export class AppService {
  constructor(
  ){}
  getHello(): string {
    return 'Hello World!';
  }

 
}
