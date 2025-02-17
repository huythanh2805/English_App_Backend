import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ExpoToken  extends Document{
  @Prop()
  token: string;
}

export const ExpoTokenSchema = SchemaFactory.createForClass(ExpoToken);