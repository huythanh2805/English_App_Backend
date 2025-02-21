import { Module } from '@nestjs/common';
import { EnglishSentenceService } from './english-sentence.service';
import { EnglishSentenceController } from './english-sentence.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EnglishSentence, EnglishSentenceSchema } from './entities/english-sentence.entity';

@Module({
  imports: [MongooseModule.forFeature([{name: EnglishSentence.name, schema: EnglishSentenceSchema}])],
  controllers: [EnglishSentenceController],
  providers: [EnglishSentenceService],
  exports: [
    MongooseModule.forFeature([{name: EnglishSentence.name, schema: EnglishSentenceSchema}]),
    EnglishSentenceService
]
})
export class EnglishSentenceModule {}
