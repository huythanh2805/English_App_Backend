import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({timestamps: true})
export class User extends Document {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: false })
    isAdmin?: boolean;

    @Prop({ default: false })
    isLoggedIn?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
