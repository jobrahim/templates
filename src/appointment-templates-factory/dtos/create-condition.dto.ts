export class CreateConditionDto {
  constructor(type: string, status: boolean, rangesdate_id: string) {
    this.type = type;
    this.status = status;
    this.rangesdate_id = rangesdate_id;
  }

  readonly id: number;
  readonly type: string;
  readonly status: boolean;
  readonly rangesdate_id: string;
}
