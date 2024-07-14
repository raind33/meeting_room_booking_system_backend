import { Module, Global } from '@nestjs/common';
import * as minio from 'minio';
import { ConfigService } from '@nestjs/config';
import { MinioController } from './minio.controller';

@Global()
@Module({
  providers: [
    {
      provide: 'MINIO_CLIENT',
      useFactory: (configService: ConfigService) => {
        return new minio.Client({
          endPoint: configService.get('minio_endpoint'),
          port: +configService.get('minio_port'),
          useSSL: false,
          accessKey: configService.get('minio_access_key'),
          secretKey: configService.get('minio_secret_key'),
        });
      },
      inject: [ConfigService],
    },
  ],
  controllers: [MinioController],
})
export class MinioModule {}
