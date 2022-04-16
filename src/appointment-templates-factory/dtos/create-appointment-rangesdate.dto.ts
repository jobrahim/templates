export class CreateAppointmentRangeDateDto {
  constructor(
    expirationMillis: number,
    created: string,
    updated: string,
    owner: string,
    status: string,
    rangedate_id: number,
  ) {
    this.expirationMillis = expirationMillis;
    this.created = created;
    this.updated = updated;
    this.owner = owner;
    this.status = status;
    this.rangedate_id = rangedate_id;
  }
  readonly id: number;
  readonly expirationMillis: number;
  readonly created: string;
  readonly updated: string;
  readonly owner: string;
  readonly status: string;
  readonly rangedate_id: number;
}
