import { LimitType } from 'src/enum/limit-type.enum';

export class CreateLimitDto {
  constructor(
    type: LimitType,
    name: string,
    quota: number,
    rangesdate_id: number,
    service_id: number,
  ) {
    this.type = type;
    this.name = name;
    this.quota = quota;
    this.rangesdate_id = rangesdate_id;
    this.service_id = service_id;
  }

  type: LimitType;
  name: string;
  quota: number;
  rangesdate_id: number;
  service_id: number;
}
