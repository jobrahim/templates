import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTemplateDto {
  @IsOptional()
  @IsNumber()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly operation_id: string;

  @IsString()
  @IsNotEmpty()
  readonly autor: string;

  @IsDateString()
  @IsOptional()
  readonly created: string;

  @IsDateString()
  @IsOptional()
  readonly changed: string;

  @IsNotEmpty()
  @IsArray()
  readonly meta_data: [
    {
      range_date_status: string;
      range_id: string;
      resources: [{ type: string; id: string; quantity: number }];
      limits: [{ type: string; id: string; limit: 0; service_id: number }];
      conditions: [{ type: string; id: string; status: boolean }];
    },
  ];
}
