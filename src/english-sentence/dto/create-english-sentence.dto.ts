import { IsBoolean, IsOptional, IsString } from "class-validator";

export class CreateEnglishSentenceDto {
    @IsString()
    sentence: string

    @IsOptional()
    @IsBoolean()
    isSend?: boolean
}
