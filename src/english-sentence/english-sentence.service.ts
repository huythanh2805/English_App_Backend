import { Injectable } from '@nestjs/common';
import { CreateEnglishSentenceDto } from './dto/create-english-sentence.dto';
import { UpdateEnglishSentenceDto } from './dto/update-english-sentence.dto';
import { InjectModel } from '@nestjs/mongoose';
import { EnglishSentence } from './entities/english-sentence.entity';
import { Model } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class EnglishSentenceService {
  constructor(
    @InjectModel(EnglishSentence.name) private readonly EnglishSentence: Model<EnglishSentence>
  ){}
  create(createEnglishSentenceDto: CreateEnglishSentenceDto) {
    return this.EnglishSentence.create(createEnglishSentenceDto);
  }

  findAll() {
    return this.EnglishSentence.find({});
  }

  findOne(id: number) {
    return this.EnglishSentence.findById(id);
  }

  update(id: number, updateEnglishSentenceDto: UpdateEnglishSentenceDto) {
    return this.EnglishSentence.findByIdAndUpdate(id, updateEnglishSentenceDto, {new: true})
  }

  remove(id: number) {
    return this.EnglishSentence.findByIdAndDelete(id)
  }

}
