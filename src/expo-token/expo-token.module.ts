import { Module } from '@nestjs/common';
import { ExpoTokenService } from './expo-token.service';
import { ExpoTokenController } from './expo-token.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpoToken, ExpoTokenSchema } from './entities/expo-token.entity';
import { SchedulesModule } from 'src/schedules/schedules.module';
import { SchedulesService } from 'src/schedules/schedules.service';

@Module({
  imports: [
    SchedulesModule,
    MongooseModule.forFeature([
    {name: ExpoToken.name, schema: ExpoTokenSchema},
  ]),
],
  controllers: [ExpoTokenController],
  providers: [ExpoTokenService],
})
export class ExpoTokenModule {}
