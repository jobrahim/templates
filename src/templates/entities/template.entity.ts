import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Template extends Document {
  @Prop()
  template_id: string;
  @Prop()
  name: string;
  @Prop()
  operation_id: string;
  @Prop()
  autor: string;
  @Prop()
  created: string;
  @Prop()
  changed: string;
  @Prop()
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

export const TemplateSchema = SchemaFactory.createForClass(Template);
