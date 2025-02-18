import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateScheduleDto {
    @IsString()
    name: string

    @IsNumber()
    @IsOptional()
    minutes?: number
}

