import { PartialType } from '@nestjs/mapped-types';
import { CreateEnglishSentenceDto } from './create-english-sentence.dto';

export class UpdateEnglishSentenceDto extends PartialType(CreateEnglishSentenceDto) {}
