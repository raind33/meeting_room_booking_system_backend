import { Controller, Get, Inject, SetMetadata } from '@nestjs/common';
import { AppService } from './app.service';
import { RequireLogin, RequirePermission, UserInfo } from './custom.decorator';
import { Etcd3 } from 'etcd3';
import { EtcdService } from './etcd/etcd.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(EtcdService)
  private etcdService: EtcdService;
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('test')
  @RequireLogin()
  @RequirePermission('ccc')
  test(@UserInfo() user): string {
    console.log(user);
    return 'test';
  }

  @Get('get')
  async getEtcd() {
    const value = await this.etcdService.getConfig('foo');
    return value;
  }
  @Get('put')
  async putEtcd() {
    await this.etcdService.saveConfig('foo', 'bar23');
    return 'done';
  }
}
