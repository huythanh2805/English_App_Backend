import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { ExpoTokenModule } from './expo-token/expo-token.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EnglishSentenceModule } from './english-sentence/english-sentence.module';
import { SettingsModule } from './settings/settings.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { SchedulesModule } from './schedules/schedules.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ExpoTokenModule,
    EnglishSentenceModule,
    SettingsModule,
    AuthModule,
    UserModule,
    SchedulesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
