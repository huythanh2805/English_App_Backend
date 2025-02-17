import { Injectable } from '@nestjs/common';
import { CreateExpoTokenDto } from './dto/create-expo-token.dto';
import { UpdateExpoTokenDto } from './dto/update-expo-token.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ExpoToken } from './entities/expo-token.entity';
import { Model } from 'mongoose';

@Injectable()
export class ExpoTokenService {
  constructor(
    @InjectModel(ExpoToken.name) private expoTokenModel: Model<ExpoToken>
  ){}
  create(createExpoTokenDto: CreateExpoTokenDto): Promise<ExpoToken> {
    return this.expoTokenModel.create(createExpoTokenDto)
  }

  findAll(): Promise<ExpoToken[]> {
    return this.expoTokenModel.find({});
  }

  findOne(id: number): Promise<ExpoToken> {
    return this.expoTokenModel.findById(id);
  }

  update(id: number, updateExpoTokenDto: UpdateExpoTokenDto): Promise<ExpoToken> {
    return this.expoTokenModel.findByIdAndUpdate(id, updateExpoTokenDto)
  }

  remove(id: number) {
    return this.expoTokenModel.findByIdAndDelete(id);
  }
}
