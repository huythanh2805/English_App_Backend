import { HttpException, Injectable } from '@nestjs/common';
import { CreateEnglishSentenceDto } from './dto/create-english-sentence.dto';
import { UpdateEnglishSentenceDto } from './dto/update-english-sentence.dto';
import { InjectModel } from '@nestjs/mongoose';
import { EnglishSentence } from './entities/english-sentence.entity';
import { Model } from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SendingNotifycationType } from 'src/common/types';
import { endOfToday, startOfToday } from 'date-fns';

@Injectable()
export class EnglishSentenceService {
  constructor(
    @InjectModel(EnglishSentence.name)
    private readonly EnglishSentence: Model<EnglishSentence>,
  ) {}
  async findOneEnglishSentence({
    user_id,
    arrayOfDates,
    isToday,
    isLoop,
  }: Omit<SendingNotifycationType, 'deviceId'>) {
    const sentence = await this.findOneSentenceInTodayByUID(user_id)
    if(!sentence) return null
    return sentence
  }

  async findOneSentenceInTodayByUID(user_id: string): Promise<EnglishSentence> {
    try {
      const sentence = await this.EnglishSentence.findOne({
        user_id,
        createdAt: {
          $gte: startOfToday(),
          $lte: endOfToday(),
        },
        isCompleted: false
      }).exec();
      (sentence.isSend = true), sentence.save();
      return sentence;
    } catch (error) {
      console.error('Error fetching sentences:', error);
      throw new HttpException(
        'Something went wrong with fetch sentence in today',
        500,
      );
    }
  }
  async findOneSentenceInArrayDate({
    user_id,
    arrayOfDates,
  }: Omit<SendingNotifycationType, 'deviceId'>): Promise<EnglishSentence> {
    try {
      const sentence = await this.EnglishSentence.findOne({
        createdAt: { $in: arrayOfDates.map((date) => new Date(date))},
        isCompleted: false
      });
      sentence.isSend = true;
      await sentence.save();
      return sentence;
    } catch (error) {
      console.error('Error fetching sentences:', error);
      throw new HttpException(
        'Something went wrong with fetch sentence in today',
        500,
      );
    }
  }

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
    return this.EnglishSentence.findByIdAndUpdate(
      id,
      updateEnglishSentenceDto,
      { new: true },
    );
  }

  remove(id: number) {
    return this.EnglishSentence.findByIdAndDelete(id);
  }
}
