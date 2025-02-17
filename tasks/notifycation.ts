import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";


@Injectable()
export class Notifycation {
    @Cron(CronExpression.EVERY_MINUTE)
    handleCron() {
    //   this.logger.debug('Called when the current second is 45');
    console.log('This task called avery 5 minutes')
    }
}