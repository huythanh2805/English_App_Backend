import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";


@Injectable()
export class ResetSentence {
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    handleCron() {
    console.log('This task called avery EVERY_DAY_AT_MIDNIGHT')
    }
}