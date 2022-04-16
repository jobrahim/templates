import { IsNotEmpty } from 'class-validator';

export class CreateApointmentDto {
  @IsNotEmpty()
  readonly date_value: string;
  @IsNotEmpty()
  readonly template_id: string;
}
