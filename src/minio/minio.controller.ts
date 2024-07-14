import { Controller, Get, Inject, Query } from '@nestjs/common';
import { In } from 'typeorm';
import * as Minio from 'minio';
import { ConfigService } from '@nestjs/config';

@Controller('minio')
export class MinioController {
  @Inject('MINIO_CLIENT')
  private minioClient: Minio.Client;

  @Inject(ConfigService)
  private readonly configService: ConfigService;

  @Get('presignedUrl')
  async list(@Query('name') name: string) {
    return this.minioClient.presignedPutObject(
      this.configService.get('minio_bucket_name'),
      name,
      3600,
    );
  }
}
