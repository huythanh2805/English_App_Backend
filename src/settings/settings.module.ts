import { forwardRef, Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Setting, SettingSchema } from './entities/setting.entity';
import { SchedulesModule } from 'src/schedules/schedules.module';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Setting.name, schema: SettingSchema}]),
    forwardRef(() => SchedulesModule)
  ],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [
    MongooseModule.forFeature([{name: Setting.name, schema: SettingSchema}]),
    SettingsService,
  ]
})
export class SettingsModule {}
