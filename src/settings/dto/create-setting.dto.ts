import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSettingDto {
    @IsString()
    @IsOptional()
    user_id?: string

    @IsNumber()
    minutes?: number

    @IsBoolean()
    @IsOptional()
    isTurnOn?: boolean

    @IsBoolean()
    @IsOptional()
    isLoop?: boolean

    @IsBoolean()
    @IsOptional()
    isToday?: boolean

    @IsNumber()
    @IsOptional()
    datesBeforeNumber?: number 

}
