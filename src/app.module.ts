import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TemplatesModule } from './templates/templates.module';
import { AuthModule } from './auth/auth.module';
import { AppointmentTemplatesFactoryModule } from './appointment-templates-factory/appointment-templates-factory.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TemplatesIntegrationModule } from './templates-integration/templates-integration.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `env/${process.env.NODE_ENV || 'local'}.env`,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'ITL',
      useFactory: async (config: ConfigService) => ({
        uri: config.get('DB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: true,
      }),
      inject: [ConfigService],
    }),
    TemplatesModule,
    AuthModule,
    AppointmentTemplatesFactoryModule,
    TemplatesIntegrationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
