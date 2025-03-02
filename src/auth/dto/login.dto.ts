import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsBoolean()
  @IsOptional()
  readonly isAdmin?: boolean;

  @IsString()
  @IsOptional()
  readonly deviceId?: string;
}
