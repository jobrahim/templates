import { Module } from '@nestjs/common';
import { AppointmentTemplatesFactoryService } from './appointment-templates-factory.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { TemplatesModule } from 'src/templates/templates.module';

@Module({
  imports: [ConfigModule, TemplatesModule],
  providers: [
    AppointmentTemplatesFactoryService,
    {
      provide: 'TIMERANGES_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('TIMERANGES_TCP_HOST'),
            port: configService.get('TIMERANGES_TCP_PORT'),
          },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: 'RESOURCES_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('RESOURCES_TCP_HOST'),
            port: configService.get('RESOURCES_TCP_PORT'),
          },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: 'LIMITS_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('SERVICE_TCP_HOST'),
            port: configService.get('SERVICE_TCP_PORT'),
          },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: 'CONDITIONS_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('CONDITIONS_TCP_HOST'),
            port: configService.get('CONDITIONS_TCP_PORT'),
          },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: 'APPOINTMENTS_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('APPOINTMENTS_TCP_HOST'),
            port: configService.get('APPOINTMENTS_TCP_PORT'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  controllers: [],
  exports: [AppointmentTemplatesFactoryService],
})
export class AppointmentTemplatesFactoryModule {}
