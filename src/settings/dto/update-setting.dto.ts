import { PartialType } from '@nestjs/mapped-types';
import { CreateSettingDto } from './create-setting.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateSettingDto extends PartialType(CreateSettingDto) {
    user_id: string;

    @IsString()
    @IsOptional()
    deviceId?: string
}
