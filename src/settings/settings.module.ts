import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Setting, SettingSchema } from './entities/setting.entity';

@Module({
  imports: [MongooseModule.forFeature([{name: Setting.name, schema: SettingSchema}])],
  controllers: [SettingsController],
  providers: [SettingsService],
  exports: [
    MongooseModule.forFeature([{name: Setting.name, schema: SettingSchema}]),
    SettingsService,
  ]
})
export class SettingsModule {}
