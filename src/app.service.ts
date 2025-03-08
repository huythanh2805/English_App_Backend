import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { Setting } from './settings/entities/setting.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EnglishSentence } from './english-sentence/entities/english-sentence.entity';
import { SchedulesService } from './schedules/schedules.service';
import { SettingsService } from './settings/settings.service';

@Injectable()
export class AppService implements OnModuleInit {
  private logger = new Logger();
  constructor(
    @InjectModel(Setting.name) private readonly Setting: Model<Setting>,
    @InjectModel(EnglishSentence.name)
    private readonly EnglishSentence: Model<EnglishSentence>,
    private readonly scheduleService: SchedulesService,
    private readonly settingService: SettingsService,
  ) {}
  async onModuleInit() {
    const shedules = await this.scheduleService.findAll();
    shedules.map(async (sche) => {
      const { minutes, isLoop, isTurnOn, arrayOfDates, isToday } =
        await this.settingService.findSettingByUserId(sche.user_id);
      const job = await this.scheduleService.createNewDynamicCronJob({
        name: sche.name,
        user_id: sche.user_id,
        minutes,
        isLoop,
        isTurnOn,
        arrayOfDates,
        isToday,
      });
      if (job) {
        job.start();
        this.logger.log('Job has been started');
      }
    });
  }
  getHello(): string {
    return 'Hello World!';
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'resetSentences',
  })
  resetSentence() {
    this.EnglishSentence.updateMany(
      {},
      {
        isCompleted: false,
        isSend: false,
      },
    );
  }
}
