import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateScheduleDto {
    @IsString()
    name: string
    
    @IsString()
    user_id: string

    @IsNumber()
    @IsOptional()
    minutes?: number
}

