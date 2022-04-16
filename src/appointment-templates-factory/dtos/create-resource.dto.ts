export class CreateResourceDto {
  constructor(
    type: ResourceType,
    status: string,
    quantity: number,
    container_id: string,
    rangedate_id: number,
  ) {
    this.type = type;
    this.status = status;
    this.quantity = quantity;
    this.rangesdate_id = rangedate_id;
    this.container_id = container_id;
  }

  type: ResourceType;
  status: string;
  quantity: number;
  container_id: string;
  rangesdate_id: number;
}

export enum ResourceType {
  CONTAINER_QUOTA = 'container-quota',
  YARD_BLOCK = 'yard_block',
}
