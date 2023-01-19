import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BrandDocument = HydratedDocument<Brand>;

@Schema({optimisticConcurrency: true, timestamps: true})
export class Brand {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop([String])
  tags: string[];

}

export const BrandSchema = SchemaFactory.createForClass(Brand);

const updateVersioningPlugin = require('mongoose-update-versioning');
BrandSchema.plugin(updateVersioningPlugin);
