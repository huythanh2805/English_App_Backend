import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Schedule } from './entities/schedule.entity';
import { Model } from 'mongoose';
import { CronJob } from 'cron'
import { SchedulerRegistry } from '@nestjs/schedule';
@Injectable()
export class SchedulesService {
  constructor(
    @InjectModel(Schedule.name) private readonly scheduleModel: Model<Schedule>,
    private readonly schedulerRegistry: SchedulerRegistry
  ){}
  async create(createScheduleDto: CreateScheduleDto) {
    const { name } = createScheduleDto
      const job = new CronJob(`*/1 * * * * *`, () => {
        console.log('this taks is called aftter 1 minute')
      });
    this.schedulerRegistry.addCronJob(name, job);
    const existingSchedule = await this.scheduleModel.findOne({name})
    if(existingSchedule) return existingSchedule
    return this.scheduleModel.create(createScheduleDto)
  }

  findAll() {
    return this.scheduleModel.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} schedule`;
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(deviceId: string) {
    return this.scheduleModel.deleteOne({name: deviceId});
  }
}
