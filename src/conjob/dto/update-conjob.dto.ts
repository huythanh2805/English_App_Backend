import { PartialType } from '@nestjs/mapped-types';
import { CreateConjobDto } from './create-conjob.dto';

export class UpdateConjobDto extends PartialType(CreateConjobDto) {}
