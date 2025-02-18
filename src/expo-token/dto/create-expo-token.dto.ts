import { IsString } from "class-validator";

export class CreateExpoTokenDto {
    @IsString()
    token: string

    @IsString()
    deviceId: string
    
}
