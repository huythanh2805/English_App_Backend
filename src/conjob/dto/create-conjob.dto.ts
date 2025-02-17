import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateConjobDto {
    @IsString()
    name: string

    @IsNumber()
    @IsOptional()
    seconds?: number
}
