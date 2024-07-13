import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Permission } from './user/entities/permission.entity';
import { Role } from './user/entities/role.entity';
import { UserModule } from './user/user.module';
import { RedisModule } from './redis/redis.module';
import { EmailModule } from './email/email.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { LoginGuard } from './login.guard';
import { PermissionGuard } from './permission.guard';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task.service';
import { MeetingRoomModule } from './meeting-room/meeting-room.module';
import { MeetingRoom } from './meeting-room/entities/meeting-room.entity';
import { BookingModule } from './booking/booking.module';
import { Booking } from './booking/entities/booking.entity';
import { StatisticModule } from './statistic/statistic.module';
// import { EtcdModule } from './etcd/etcd.module';
import * as path from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join(__dirname, '.env'),
      // envFilePath: 'src/.env',
    }),

    TypeOrmModule.forRootAsync({
      useFactory(configService: ConfigService) {
        return {
          type: 'mysql',
          host: configService.get('mysql_server_host'),
          port: configService.get('mysql_server_port'),
          username: configService.get('mysql_server_username'),
          password: configService.get('mysql_server_password'),
          database: configService.get('mysql_server_database'),
          synchronize: false, // 设置为 true，在应用程序启动时会自动创建数据库表结构
          logging: true, // 设置为 true，TypeORM 会在控制台输出数据库查询日志，便于调试
          entities: [User, Permission, Role, MeetingRoom, Booking],
          poolSize: 10,
          connectorPackage: 'mysql2',
          extra: {
            authPlugin: 'sha256_password',
          },
        };
      },
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('jwt_secret'),
          signOptions: {
            expiresIn: '30m', // 默认 30 分钟
          },
        };
      },
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    UserModule,
    RedisModule,
    EmailModule,
    MeetingRoomModule,
    BookingModule,
    StatisticModule,
    // EtcdModule.forRootAsync({
    //   async useFactory(configService: ConfigService) {
    //     await 2323;
    //     return {
    //       hosts: configService.get('etcd_hosts'),
    //       auth: {
    //         username: configService.get('etcd_auth_username'),
    //         password: configService.get('etcd_auth_password'),
    //       },
    //     };
    //   },
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [AppController],
  providers: [
    TaskService,
    AppService,
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule {}
