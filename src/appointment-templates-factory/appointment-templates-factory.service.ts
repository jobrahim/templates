import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TemplatesConstants } from 'src/templates.constants';
import { FindTemplateDto } from 'src/templates/dto/find-template';
import { TemplatesService } from 'src/templates/templates.service';
import { CreateAppointmentRangeDateDto } from './dtos/create-appointment-rangesdate.dto';
import { CreateConditionDto } from './dtos/create-condition.dto';
import { CreateLimitDto } from './dtos/create-limit.dto';
import { CreateRangesDateDto } from './dtos/create-ranges-date.dto';
import { CreateResourceDto } from './dtos/create-resource.dto';
import { DateDto } from './dtos/date.dto';
import { RangeDto } from './dtos/ranges.dto';

@Injectable()
export class AppointmentTemplatesFactoryService {
  constructor(
    @Inject('TIMERANGES_SERVICE')
    private readonly timeRangeService: ClientProxy,
    @Inject('RESOURCES_SERVICE') private readonly resourceService: ClientProxy,
    @Inject('LIMITS_SERVICE') private readonly limitService: ClientProxy,
    @Inject('CONDITIONS_SERVICE')
    private readonly conditionService: ClientProxy,
    @Inject('APPOINTMENTS_SERVICE')
    private readonly appointmentService: ClientProxy,
    private templatesServices: TemplatesService,
  ) {}

  async createAppointmentByTemplate(data: string, template: string) {
    try {
      console.log('call create_appointment_by_template');
      const listAppointment = [];
      //obtiene los datos para empezar a crear las entidades.
      console.log('find template');
      const templateJson: FindTemplateDto =
        await this.templatesServices.getTemplateByName(template);

      if (templateJson) {
        const operationID = templateJson.operation_id;
        const metaData: Array<any> = templateJson.meta_data;
        console.log(metaData);

        //Se crea un date
        const date: DateDto = await this.createDate(
          data,
          'close', // Se crea el dia cerrado
          operationID,
        );
        if (!date.error) {
          const ranges: RangeDto[] = await this.getRangesByOperation(
            operationID,
          );

          // Se recorre el array que correpende a la informacion de un ranges
          for (const template of metaData) {
            const rangesExist = ranges.find((e) => {
              return e.range_id == template.range_id;
            });

            // Si el ranges del template coincide con el ranges de la bd
            if (rangesExist) {
              const listRangesDates = [];
              const listResources = [];
              const listLimits = [];
              const listConditions = [];

              // Se asosacion el date y reanges, y se obtiene un rangesdate_id
              const rangedate = await this.createRangesDate(
                new CreateRangesDateDto(
                  date.id,
                  rangesExist.range_id,
                  0,
                  '',
                  '',
                  '',
                ),
              );
              listRangesDates.push(rangedate);

              // Se crea un resources apartir del template, y se asocia a rangedate ya creado
              const resources = template.resources;
              for (const resource of resources) {
                const r = await this.createResource(
                  new CreateResourceDto(
                    resource.type,
                    'CLOSE',
                    resource.quantity,
                    resource.id,
                    rangedate.id,
                  ),
                );
                listResources.push(r);
              }

              // Se crea limits apartir del template, y se asocia con el rangeDate ya creado
              const limits = template.limits;
              for (const limit of limits) {
                const l = await this.createLimit(
                  new CreateLimitDto(
                    limit.type,
                    limit.id,
                    limit.limit,
                    rangedate.id,
                    limit.service_id,
                  ),
                );
                listLimits.push(l);
              }

              // Se crea conditions apartir del template y se asocia con el rangeDate ya creada
              const conditions = template.conditions;
              for (const condition of conditions) {
                const c = await this.createCondition(
                  new CreateConditionDto(
                    condition.type,
                    condition.status,
                    rangedate.id,
                  ),
                );
                listConditions.push(c);
              }

              listAppointment.push({
                listRangesDates,
                listResources,
                listConditions,
                listLimits,
              });
            } else {
              return { success: false, message: 'Ranges no existe' };
            }
          }
          return {
            success: true,
            message: 'Se creo Appointment exitosamente',
            result: listAppointment,
          };
        } else {
          return { success: false, message: date.error };
        }
      } else {
        return { success: false, message: 'El template ingresado no existe' };
      }
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  /**
   * Se crea DATE
   * @param date del dia
   * @param id de operacion
   */
  async createDate(
    value: string,
    status: string,
    operation_id: string,
  ): Promise<DateDto> {
    // Se conecta a micro timeranges, y crea un date, y lo persiste
    console.log('call create_date');
    return await this.timeRangeService
      .send<any>(
        { cmd: 'create_date' },
        {
          value,
          status,
          operation_id,
        },
      )
      .toPromise();
  }

  /**
   * Se traer ranges por operation_id
   * @param id de operacion
   */
  async getRangesByOperation(operation_id: string): Promise<RangeDto[]> {
    console.log('call range_by_operation');
    return await this.timeRangeService
      .send<any>(
        { cmd: 'range_by_operation' },
        {
          operation_id,
        },
      )
      .toPromise();
  }

  /**
   * Se crea un rangesdate
   * @param date
   * @param ranges
   */
  async createRangesDate(createRangesDateDto: CreateRangesDateDto) {
    console.log('call create_ranges_date');
    return await this.timeRangeService
      .send<any>({ cmd: 'create_rangesdate' }, createRangesDateDto)
      .toPromise();
  }

  /**
   * Se crea un limit
   */
  async createLimit(createLimitDto: CreateLimitDto) {
    console.log('call create_limit');
    return await this.limitService
      .send<any>({ cmd: 'create_limit' }, createLimitDto)
      .toPromise();
  }

  /**
   * Crea un container quota
   */
  async createResource(createResourceDto: CreateResourceDto) {
    console.log('call create_resource');
    return await this.resourceService
      .send<any>({ cmd: 'create_resource' }, createResourceDto)
      .toPromise();
  }

  /**
   * Crea un Condition
   */
  async createCondition(createCondition: CreateConditionDto) {
    console.log('call create_condition');
    return await this.conditionService
      .send<any>({ cmd: 'create_condition' }, createCondition)
      .toPromise();
  }

  async createAppointment(
    createAppointmentRangeDateDto: CreateAppointmentRangeDateDto,
  ) {
    console.log('call create_appointment');
    return await this.appointmentService
      .send<any>({ cmd: 'create_appointment' }, createAppointmentRangeDateDto)
      .toPromise();
  }
}
