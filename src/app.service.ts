import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { Setting } from './settings/entities/setting.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EnglishSentence } from './english-sentence/entities/english-sentence.entity';
import { SchedulesService } from './schedules/schedules.service';

@Injectable()
export class AppService implements OnModuleInit{
  private logger = new Logger()
  constructor(
    @InjectModel(Setting.name) private readonly Setting: Model<Setting>,
    @InjectModel(EnglishSentence.name) private readonly EnglishSentence: Model<EnglishSentence>,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly scheduleService: SchedulesService
  ) {}
  async onModuleInit() {
    const shedules = await this.scheduleService.findAll()
    console.log({shedules})
  }
  getHello(): string {
    return 'Hello World!';
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: "resetSentences"
  })
  resetSentence(){
    this.EnglishSentence.updateMany({},{
      isCompleted: false,
      isSend: false
    })
  }
}
