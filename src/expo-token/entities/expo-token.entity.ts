import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps: true})
export class ExpoToken  extends Document{
  @Prop({required: true})
  token: string;

  @Prop({required: true})
  deviceId: string;
}

export const ExpoTokenSchema = SchemaFactory.createForClass(ExpoToken);