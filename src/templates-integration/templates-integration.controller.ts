import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateApointmentDto } from 'src/appointment-templates-factory/dtos/create-appointment.dto';
import { TemplatesIntegrationService } from './templates-integration.service';

@Controller('templates-integration')
export class TemplatesIntegrationController {
  constructor(
    private templatesIntegrationService: TemplatesIntegrationService,
  ) {}

  @MessagePattern({ cmd: 'appointment_template_create' })
  createAppointmentByTemplate(data: CreateApointmentDto) {
    return this.templatesIntegrationService.createAppointmentByTemplate(
      data.date_value,
      data.template_id,
    );
  }
}
