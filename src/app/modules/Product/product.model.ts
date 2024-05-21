import { Schema, model } from 'mongoose';
import { Product, Variants } from './product.interface';
import Joi, { string } from 'joi';

const variantsSchema = new Schema<Variants>({ type: String, value: String });

const productSchema = new Schema<Product>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  variants: {
    type: [variantsSchema],
    required: true,
  },
  inventory: {
    type: {
      quantity: Number,
      inStock: Boolean,
    },
  },
});

productSchema.index({
  name: 'text',
  description: 'text',
  tags: 'text',
  category: 'text',
});

export const productModel = model<Product>('Products', productSchema);
