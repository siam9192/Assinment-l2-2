import { Schema, model } from 'mongoose';
import { Inventory, Product, Variants } from './product.interface';
import Joi, { string } from 'joi';

const variantsSchema = new Schema<Variants>({ type: String, value: String });
const inventorySchema = new Schema<Inventory>({
  quantity: Number,
  inStock: Boolean,
});

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
  inventory: inventorySchema,
});

productSchema.index({
  name: 'text',
  description: 'text',
  tags: 'text',
  category: 'text',
});

export const productModel = model<Product>('Products', productSchema);
