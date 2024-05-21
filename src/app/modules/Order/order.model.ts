import Joi, { object } from 'joi';
import { Order } from './order.interface';
import { Schema, model } from 'mongoose';

const orderSchema = new Schema<Order>({
  email: String,
  productId: String,
  price: String,
  quantity: String,
});

export const orderModel = model<Order>('Orders', orderSchema);
