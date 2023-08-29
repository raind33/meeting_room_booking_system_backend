import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Timeout, Interval } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  // @Cron(CronExpression.EVERY_5_SECONDS)
  // handleCron() {
  //   console.log('task execute');
  // }
  // @Timeout(5000) // 5秒后执行
  // handleTimeout() {
  //   console.log('一次性定时任务执行');
  // }
  // @Interval(3000) // 每隔3秒执行一次
  // handleInterval() {
  //   console.log('周期性定时任务执行');
  // }
}
