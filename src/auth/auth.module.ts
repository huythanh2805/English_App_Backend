import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/users/users.service';
import { SettingsService } from 'src/settings/settings.service';
import { SettingsModule } from 'src/settings/settings.module';
import { SchedulesService } from 'src/schedules/schedules.service';
import { SchedulesModule } from 'src/schedules/schedules.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        // signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN')},
      }),
    }),
    ConfigModule,
    UserModule,
    PassportModule,
    SettingsModule,
    SchedulesModule,
  ],
  providers: [AuthService, JwtStrategy, UserService, SettingsService],
  controllers: [AuthController],
})
export class AuthModule {}
