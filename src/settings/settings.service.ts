import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Setting } from './entities/setting.entity';
import { Model, Types } from 'mongoose';
import { SchedulesService } from 'src/schedules/schedules.service';
import { ObjectId } from 'mongodb';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Setting.name) private readonly Setting: Model<Setting>,
    @Inject(forwardRef(() => SchedulesService))
    private readonly scheduleService: SchedulesService,
  ) {}
  create(createSettingDto: CreateSettingDto) {
    return this.Setting.create(createSettingDto);
  }

  findAll() {
    return this.Setting.find({});
  }

  findOne(user_id: string): Promise<Setting> {
    return this.Setting.findOne({ user_id });
  }
  findSettingByUserId(user_id: string): Promise<Setting> {
    // Chuyển user_id sang ObjectId nếu cần
    const userObjectId = new Types.ObjectId(user_id);
    return this.Setting.findOne({ user_id: userObjectId });
  }

  async update(updateSettingDto: UpdateSettingDto) {
    const { user_id, deviceId, arrayOfDates, ...rest } = updateSettingDto;
    try {
      if (rest.isTurnOn) {
        this.scheduleService.start(deviceId);
      } else {
        this.scheduleService.stop(deviceId);
      }
      const userObjectId = new ObjectId(user_id);
      const existingSetting = await this.Setting.findOne({user_id: userObjectId}) as any
      if(!existingSetting) throw new HttpException("Không tìm thấy setting", 504)
      const setting = await this.Setting.findByIdAndUpdate(
        existingSetting._id,
        { ...rest },
        {new: true}
      );
      return setting;
    } catch (error) {
      throw new HttpException(error.message, 505);
    }
  }
}
