import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Schedule } from './entities/schedule.entity';
import { Model } from 'mongoose';
import { CronJob } from 'cron';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ExpoTokenService } from 'src/expo-token/expo-token.service';
import { EnglishSentenceService } from 'src/english-sentence/english-sentence.service';
import { SettingsService } from 'src/settings/settings.service';
import Expo, { ExpoPushMessage } from 'expo-server-sdk';
import { SendingNotifycationType } from 'src/common/types';

@Injectable()
export class SchedulesService {
  private expo: Expo;
  private logger = new Logger();
  constructor(
    @InjectModel(Schedule.name) private readonly scheduleModel: Model<Schedule>,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly expoTokenService: ExpoTokenService,
    private readonly englishSentenceService: EnglishSentenceService,
    @Inject(forwardRef(() => SettingsService))
    private readonly settingsService: SettingsService,
  ) {
    this.expo = new Expo();
  }

  async sendingNotifycation({ user_id, deviceId, arrayOfDates, isLoop, isToday }: SendingNotifycationType) {
    const expoToken = await this.expoTokenService.findExpoToken(deviceId);
    const sentence =
      await this.englishSentenceService.findOneEnglishSentence({user_id, arrayOfDates, isLoop, isToday});
    if(!sentence) return
    const message: ExpoPushMessage = {
      to: 'ExponentPushToken[sMpgBNK0Lk7DhCqae_RdL8]',
      sound: 'default',
      title: 'Test gửi thông báo',
      body: 'đây là nội dung',
      priority: 'high',
      data: { someData: 'goes here' },
    };
    console.log('-------------------');
    console.log('đang chạy');
    try {
      // Gửi thông báo
      const response = await this.expo.sendPushNotificationsAsync([message]);
      console.log('Phản hồi từ Expo:', response);
      return response;
    } catch (error) {
      console.error('Lỗi khi gửi thông báo:', error);
      throw new Error('Gửi thông báo thất bại');
    }
  }

  async createNewDynamicCronJob({
    name,
    user_id,
  }: {
    name: string;
    user_id: string;
  }): Promise<CronJob | void> {
    const { minutes, isLoop, isTurnOn, arrayOfDates, isToday } =
    await this.settingsService.findSettingByUserId(user_id);
    if (!isTurnOn) return this.logger.log(`Schedule of ${user_id} is turn off`);

    const job = new CronJob(
      `*/${minutes || process.env.DEFAULT_MINUTES} * * * *`,
      async () => {
        await this.sendingNotifycation({
          deviceId: name,
          user_id,
          isLoop,
          arrayOfDates,
          isToday,
        });
      },
    );
    this.schedulerRegistry.addCronJob(name, job);
    return job;
  }
  async create(createScheduleDto: CreateScheduleDto) {
    const { name, user_id } = createScheduleDto;
    this.createNewDynamicCronJob({ name, user_id });
    const existingSchedule = await this.scheduleModel.findOne({ name });
    if (existingSchedule) return existingSchedule;
    return this.scheduleModel.create(createScheduleDto);
  }

  findAll() {
    return this.scheduleModel.find({});
  }

  remove(deviceId: string) {
    // delete current schedule
    this.schedulerRegistry.deleteCronJob(deviceId);
    // remove from db
    return this.scheduleModel.deleteOne({ name: deviceId });
  }
}
