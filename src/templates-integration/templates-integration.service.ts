import { Injectable } from '@nestjs/common';
import { AppointmentTemplatesFactoryService } from 'src/appointment-templates-factory/appointment-templates-factory.service';

@Injectable()
export class TemplatesIntegrationService {
  constructor(
    private appointmentTemplatesServices: AppointmentTemplatesFactoryService,
  ) {}
  createAppointmentByTemplate(date: string, template_id: string) {
    return this.appointmentTemplatesServices.createAppointmentByTemplate(
      date,
      template_id,
    );
  }
}
