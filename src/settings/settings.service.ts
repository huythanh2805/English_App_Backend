import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Setting } from './entities/setting.entity';
import { Model, Types } from 'mongoose';
import { SchedulesService } from 'src/schedules/schedules.service';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Setting.name) private readonly Setting: Model<Setting>,
    @Inject(forwardRef(() => SchedulesService))
    private readonly scheduleService: SchedulesService
  ){}
  create(createSettingDto: CreateSettingDto) {
      return this.Setting.create(createSettingDto)
  }

  findAll() {
      return this.Setting.find({})
  }
  
  findOne(id: string) {
    return `This action returns a #${id} setting`;
  }
  findSettingByUserId(user_id: string): Promise<Setting> {
    // Chuyển user_id sang ObjectId nếu cần
    const userObjectId = new Types.ObjectId(user_id);
    return this.Setting.findOne({user_id: userObjectId});
  }

 async update(updateSettingDto: UpdateSettingDto) {
  const {user_id, deviceId, ...rest} = updateSettingDto
  if(rest.isTurnOn){
   await this.scheduleService.create({name: deviceId, user_id})
  }else{
  await this.scheduleService.remove(deviceId)
  }
  return this.Setting.findOneAndUpdate({user_id}, {...rest}, {new: true})
  }
}
