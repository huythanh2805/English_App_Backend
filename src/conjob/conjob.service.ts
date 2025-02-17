import { Injectable, Logger } from '@nestjs/common';
import { CreateConjobDto } from './dto/create-conjob.dto';
import { UpdateConjobDto } from './dto/update-conjob.dto';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
@Injectable()
export class ConjobService {
  private logger = new Logger()
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry
  ){}
  create(createConjobDto: CreateConjobDto) {
    const {seconds, name} = createConjobDto
    const job = new CronJob(`*/${seconds} * * * * *`, () => {
      console.log(`this task is called after evcery ${seconds}s`)
    });
  
    this.schedulerRegistry.addCronJob(name, job);
    job.start();
  
    this.logger.warn(
      `job ${name} added for each minute at ${seconds} seconds!`,
    );
  }

  stop(name: string) {
    const job = this.schedulerRegistry.getCronJob(name)
    job.stop()
    console.log(`job ${name} stopped next action is ${job.nextDate()}`)
  }

  start(name: string) {
    const job = this.schedulerRegistry.getCronJob(name)
    job.start()
    console.log(`job ${name} starts`)
  }

  getAllTaks() {
    const jobs = this.schedulerRegistry.getCronJobs();
    jobs.forEach((value, key, map) => {
      let next;
      try {
        next = value.nextDate().toJSDate();
      } catch (e) {
        next = 'error: next fire date is in the past!';
      }
      this.logger.log(`job: ${key} -> next: ${next}`);
    });
  }
}
