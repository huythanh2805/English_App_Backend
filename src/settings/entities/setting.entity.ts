import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({timestamps:  true})
export class Setting {
    @Prop({
      type: Types.ObjectId, ref: "User", required: true
    })
    user_id: string

    @Prop({default: 1})
    minutes?: number

    @Prop({default: false})
    isTurnOn?: boolean

    @Prop({default: false})
    isLoop?: boolean

    @Prop({default: true})
    isToday?: boolean

    @Prop({default: 0})
    datesBeforeNumber?: number
}
export const SettingSchema = SchemaFactory.createForClass(Setting)

