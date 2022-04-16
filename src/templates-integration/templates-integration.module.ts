import { Module } from '@nestjs/common';
import { TemplatesIntegrationService } from './templates-integration.service';
import { TemplatesIntegrationController } from './templates-integration.controller';
import { AppointmentTemplatesFactoryModule } from 'src/appointment-templates-factory/appointment-templates-factory.module';

@Module({
  imports: [AppointmentTemplatesFactoryModule],
  providers: [TemplatesIntegrationService],
  controllers: [TemplatesIntegrationController],
})
export class TemplatesIntegrationModule {}
