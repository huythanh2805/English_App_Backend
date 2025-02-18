import { Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Setting } from './entities/setting.entity';
import { Model } from 'mongoose';

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(Setting.name) private readonly Setting: Model<Setting>
  ){}
  create(createSettingDto: CreateSettingDto) {
      return this.Setting.create(createSettingDto)
  }

  findAll() {
      return "settings find all"
  }
  
  findOne(id: string) {
    return `This action returns a #${id} setting`;
  }
  findSettingByUserId(user_id: string) {
    return this.Setting.findOne({user_id});
  }

  update(updateSettingDto: UpdateSettingDto) {
  const {user_id, ...rest} = updateSettingDto
  return this.Setting.findOneAndUpdate({user_id}, {...rest}, {new: true})
  }
}
