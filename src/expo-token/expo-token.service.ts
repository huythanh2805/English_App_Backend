import { HttpException, Injectable } from '@nestjs/common';
import { CreateExpoTokenDto } from './dto/create-expo-token.dto';
import { UpdateExpoTokenDto } from './dto/update-expo-token.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ExpoToken } from './entities/expo-token.entity';
import { Model } from 'mongoose';
import { SchedulerRegistry } from '@nestjs/schedule';
import {CronJob} from 'cron'
import { SchedulesService } from 'src/schedules/schedules.service';

@Injectable()
export class ExpoTokenService {
  constructor(
    @InjectModel(ExpoToken.name) private ExpoTokenModel: Model<ExpoToken>,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly scheduleService: SchedulesService
  ) {}
  async findExpoToken (deviceId: string){
    const expoToken = await this.ExpoTokenModel.findOne({deviceId})
    if(!expoToken) return null
    return expoToken
  }
  async create(createExpoTokenDto: CreateExpoTokenDto) {
    try {
      const { deviceId } = createExpoTokenDto;
      const existingExpoToken = await this.findExpoToken(deviceId)
      if(existingExpoToken) throw new HttpException("ExpoToken is existing", 400)

      const expoToken = await this.ExpoTokenModel.create(createExpoTokenDto);
      const schedule = await this.scheduleService.create({ name: deviceId });
      
      return {
        message: "Success",
        data: {
          expoToken,
          schedule
        }
      }
    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, error.status)
    }
  }

  findAll(): Promise<ExpoToken[]> {
    return this.ExpoTokenModel.find({});
  }

  findOne(id: number): Promise<ExpoToken> {
    return this.ExpoTokenModel.findById(id);
  }

  update(
    id: number,
    updateExpoTokenDto: UpdateExpoTokenDto,
  ): Promise<ExpoToken> {
    return this.ExpoTokenModel.findByIdAndUpdate(id, updateExpoTokenDto);
  }

  remove(id: number) {
    return this.ExpoTokenModel.findByIdAndDelete(id);
  }
}
