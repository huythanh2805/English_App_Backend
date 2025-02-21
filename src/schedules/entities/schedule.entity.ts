import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps: true})
export class Schedule extends Document {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true})
    user_id?: string;
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
