import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class LogoutDto {
  @IsString()
  user_id: string

  @IsString()
  deviceId: string
}
