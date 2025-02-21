import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({timestamps: true})
export class EnglishSentence extends Document{
    @Prop({
        type: Types.ObjectId, ref: "User", required: true
    })
    user_id: string

    @Prop()
    sentence: string

    @Prop({default: false})
    isSend: boolean

    @Prop({default: false})
    isCompleted?: boolean

}
export const EnglishSentenceSchema = SchemaFactory.createForClass(EnglishSentence);