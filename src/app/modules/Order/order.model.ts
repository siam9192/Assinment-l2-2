import { Product } from '../Product/product.interface';
import { productModel } from '../Product/product.model';
import { Order } from './order.interface';
import mongoose, { Schema, model } from 'mongoose';

const orderSchema = new Schema<Order>({
  email: String,
  productId: String,
  price: String,
  quantity: String,
});

orderSchema.pre('save', async function (next) {
  const order: Order = this;
  const product = await productModel.findOne({
    _id: new mongoose.Types.ObjectId(this.productId),
  });
  //   If product is not  available   or ordered quantity is not available then give the error otherwise accept the order inventory and accept the order
  if (!product) {
    throw new Error('Order not found');
  } else if (
    !product.inventory.inStock ||
    order.quantity > product.inventory.quantity
  ) {
    throw new Error('Insufficient quantity available in inventory');
  }
  next();
});

orderSchema.post('save', async function () {
  const product: any = await productModel.findOne({
    _id: new mongoose.Types.ObjectId(this.productId),
  });

  const updatedDoc = {
    quantity: product.inventory.quantity - this.quantity,
    inStock: product.inventory.quantity - this.quantity === 0 ? false : true,
  };
  //  Update the product new quantity and inStock status
  await productModel.updateOne(
    { _id: product._id },
    {
      $set: {
        inventory: updatedDoc,
      },
    },
  );
});

export const orderModel = model<Order>('orders', orderSchema);
