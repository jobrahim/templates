import { IsDateString, IsObject, IsString } from 'class-validator';
export class FindTemplateDto {
  @IsString()
  _id: string;
  @IsString()
  template_id: string;
  @IsString()
  name: string;
  @IsString()
  operation_id: string;
  @IsString()
  autor: string;
  @IsDateString()
  created: string;
  @IsDateString()
  changed: string;
  @IsObject()
  meta_data: [
    {
      range_date_status: string;
      range_id: string;
      resources: [{ type: string; id: string; quantity: number }];
      limits: [{ type: string; id: string; limit: 0; service_id: number }];
      conditions: [{ type: string; id: string; status: boolean }];
    },
  ];
}
