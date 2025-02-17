import { PartialType } from '@nestjs/mapped-types';
import { CreateExpoTokenDto } from './create-expo-token.dto';

export class UpdateExpoTokenDto extends PartialType(CreateExpoTokenDto) {}
