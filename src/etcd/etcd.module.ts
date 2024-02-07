import { DynamicModule, Module } from '@nestjs/common';
import { EtcdService } from './etcd.service';
import { Etcd3, IOptions } from 'etcd3';

// @Module({
//   providers: [
//     EtcdService,
//     {
//       provide: 'ETCD_CLIENT',
//       useFactory: () => {
//         return new Etcd3({
//           hosts: 'http://localhost:2379',
//           auth: {
//             username: 'root',
//             password: '123456',
//           },
//         });
//       },
//     },
//   ],
//   exports: [EtcdService],
// })
// export class EtcdModule {}

// 动态注册 1
// export class EtcdModule {
//   static forRoot(options: IOptions): DynamicModule {
//     return {
//       module: EtcdModule,
//       providers: [
//         EtcdService,
//         {
//           provide: 'ETCD_CLIENT',
//           useFactory: () => {
//             return new Etcd3(options);
//           },
//         },
//       ],
//       exports: [EtcdService],
//     };
//   }
// }
// 动态注册 2
export interface EtcdModuleAsyncOptions {
  useFactory?: (...args: any[]) => Promise<IOptions> | IOptions;
  inject?: any[];
}
const ETCD_CLIENT_OPTIONS_TOKEN = 'ETCD_CLIENT_OPTIONS';
export class EtcdModule {
  static forRootAsync(options: EtcdModuleAsyncOptions): DynamicModule {
    return {
      module: EtcdModule,
      providers: [
        EtcdService,
        {
          provide: 'ETCD_CLIENT',
          async useFactory(options: IOptions) {
            return new Etcd3(options);
          },
          inject: [ETCD_CLIENT_OPTIONS_TOKEN],
        },
        {
          provide: ETCD_CLIENT_OPTIONS_TOKEN,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ],
      exports: [EtcdService],
    };
  }
}
