import { Module } from '@nestjs/common';
import { ConjobService } from './conjob.service';
import { ConjobController } from './conjob.controller';

@Module({
  controllers: [ConjobController],
  providers: [ConjobService],
})
export class ConjobModule {}
