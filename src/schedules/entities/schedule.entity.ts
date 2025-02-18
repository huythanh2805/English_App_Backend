import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps: true})
export class Schedule extends Document {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ default: 1})
    mimutes?: number;
    
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
