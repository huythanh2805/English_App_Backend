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
    // const sentence = isToday ?
    //  await this.getOneSentenceInTodayByUID(user_id, isLoop) :
    //  await this.getOneSentenceInAllDaysByUId(user_id, isLoop)
    return await this.getOneSentenceInTodayByUID(user_id, isLoop) 
  }
  async findOneSentenceInAllDays (user_id: string){
    const allSentence =  await this.EnglishSentence.find({
      user_id,
      isCompleted: false,
      isSend: false
    }).exec();
    const randomNum = Math.floor(Math.random() * allSentence.length )
    const randomSentence = allSentence.find((item, index) => index == randomNum ) as EnglishSentence
    if(randomSentence) (randomSentence.isSend = true), randomSentence.save();
    return randomSentence
  }
  async getOneSentenceInAllDaysByUId(user_id: string, isLoop: boolean) {
    try {
      const sentence = await this.findOneSentenceInAllDays(user_id)
      // Cập nhật lại trạng thái đã gửi nếu người dùng muốn lặp lại vô tận
      if(isLoop && !sentence) {
        await this.EnglishSentence.updateMany({
          user_id,
        },
        {
          isSend: false
        }
      ).exec()
      return await this.findOneSentenceInAllDays(user_id)
      }
      return sentence;
    } catch (error) {
      console.error('Error fetching sentences:', error);
      throw new HttpException(
        'Something went wrong with fetch sentence in today',
        500,
      );
    }
  }
  async findOneSentenceInday (user_id: string){
    const sentence =  await this.EnglishSentence.findOne({
      user_id,
      createdAt: {
        $gte: startOfToday(),
        $lte: endOfToday(),
      },
      isCompleted: false,
      isSend: false
    }).exec();
    if(sentence) (sentence.isSend = true), sentence.save();
    return sentence
  }
  async getOneSentenceInTodayByUID(user_id: string, isLoop: boolean): Promise<EnglishSentence> {
    try {
      const sentence = await this.findOneSentenceInday(user_id)
      // Cập nhật lại trạng thái đã gửi nếu người dùng muốn lặp lại vô tận
      if(isLoop && !sentence) {
        await this.EnglishSentence.updateMany({
          user_id,
          createdAt: {
            $gte: startOfToday(),
            $lte: endOfToday(),
          },
        },
        {
          isSend: false
        }
      ).exec()
      return await this.findOneSentenceInday(user_id)
      }
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

  async getUserSentences(user_id: string){
    return this.EnglishSentence.find({user_id})
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

  remove(id: string) {
    return this.EnglishSentence.findByIdAndDelete(id);
  }
}
