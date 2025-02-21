import { forwardRef, Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Schedule, ScheduleSchema } from './entities/schedule.entity';
import { ExpoTokenModule } from 'src/expo-token/expo-token.module';
import { EnglishSentenceModule } from 'src/english-sentence/english-sentence.module';
import { SettingsModule } from 'src/settings/settings.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Schedule.name, schema: ScheduleSchema}
    ]),
    forwardRef(() => ExpoTokenModule),
    forwardRef(() => SettingsModule),
    EnglishSentenceModule,
],
  controllers: [SchedulesController],
  providers: [SchedulesService],
  exports: [SchedulesService]
})
export class SchedulesModule {}
