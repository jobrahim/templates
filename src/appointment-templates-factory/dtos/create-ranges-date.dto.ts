export class CreateRangesDateDto {
  constructor(
    date_id: number,
    range_id: string,
    qtity: number,
    status: string,
    ext_user: string,
    active: string,
  ) {
    this.date_id = date_id;
    this.range_id = range_id;
    this.qtity = qtity;
    this.status = status;
    this.ext_user = ext_user;
    this.active = active;
  }

  readonly date_id: number;

  readonly range_id: string;

  qtity: number;

  status: string;

  ext_user: string;

  readonly active: string;
}
