import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { Notifycation } from 'tasks/notifycation';
import { ConfigModule } from '@nestjs/config';
import { ExpoTokenModule } from './expo-token/expo-token.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConjobModule } from './conjob/conjob.module';

@Module({
  imports: [ 
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ExpoTokenModule,
    ConjobModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
