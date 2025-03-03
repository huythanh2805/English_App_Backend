import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { SettingsService } from 'src/settings/settings.service';  ``
import { LogoutDto } from './dto/logout.dto';
import { SchedulerRegistry } from '@nestjs/schedule';
import { SchedulesService } from 'src/schedules/schedules.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly scheduleRegistry: SchedulerRegistry,
    private readonly configService: ConfigService,
    private readonly settingsService: SettingsService,
    private readonly scheduleService: SchedulesService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user || !user) {
      throw new NotFoundException('User not found');
    }
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
  }

  async checkExistUser(email: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      throw new HttpException('User exist', 400);
    }
    return null;
  }
  async checkUserLoggedIn(email: string): Promise<any> {
    const { isLoggedIn } = await this.userService.findByEmail(email);
    if (isLoggedIn) {
      throw new HttpException('User Logged In', 400);
    }
    return null;
  }
  async checkUserSetting(user: any, deviceId: string) {
    const { isTurnOn } = await this.settingsService.findSettingByUserId(
      user._id,
    );
    //  adding schedule in db and dynamic cronjob
    await this.scheduleService.create({
      name: deviceId,
      user_id: user._doc._id,
    });
    //  If setting turn on schedule will turn on
    if (isTurnOn) {
      const job = this.scheduleRegistry.getCronJob(deviceId);
       job.start();
    }
  }
  async login(user: any, deviceId: string) {
    try {
      const payload = { email: user.email, sub: user._id };
      const accessToken = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        // expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
      });
      // Check if setting user is turn on will create new schedule
      await this.checkUserSetting(user, deviceId);
      // Update user logged in
      await this.userService.updateLoggedIn(user._id, true);
      return {
        message: 'Login success',
        access_token: accessToken,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, 400);
    }
  }

  async register(email: string, password: string) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.userService.createUser(email, hashedPassword);
      await this.settingsService.create({ user_id: newUser._id as string });
      return {
        message: 'Success',
        user: newUser,
      };
    } catch (error) {
      console.log({ error });
      throw new HttpException('Register failed', 500);
    }
  }

  async logout(body: LogoutDto) {
    const { deviceId, user_id } = body;
    const userExisting = await this.userService.findOne(user_id);
    if (!userExisting) throw new NotFoundException('Không tìm thấy user');
    // delete from db
    await this.scheduleService.remove(deviceId);
    // Update user logged in
    await this.userService.updateLoggedIn(user_id, false);
    return {
      message: 'Logout successfully!',
    };
  }
}
