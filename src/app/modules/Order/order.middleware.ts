import mongoose from 'mongoose';
import { Order } from './order.interface';
import { orderModel } from './order.model';
import { NextFunction, Request, Response } from 'express';
import Config from '../../Config';
import { object } from 'joi';

//  this is a middleware function that will check the product quantity and give  the response based on the result

const handleOrders = async (req: Request, res: Response) => {
  const order = req.body;
  await mongoose.connect(Config.dataBase_url as string);

  const collection = mongoose.connection.db.collection('products');

  const product = await collection.findOne({
    _id: new mongoose.Types.ObjectId(order.productId),
  });

  if (!product) {
    throw new Error('Product not found');
  } else if (
    !product.inventory.inStock ||
    order.quantity > product.inventory.quantity
  ) {
    throw new Error('Insufficient quantity available in inventory');
  } else {
    const updatedDoc = {
      quantity: product.inventory.quantity - order.quantity,
      inStock: product.inventory.quantity - order.quantity === 0 ? false : true,
    };
    // console.log(updatedDoc)

    await collection.updateOne(
      { _id: product._id },
      {
        $set: {
          inventory: updatedDoc,
        },
      },
    );
  }
};

export default {
  handleOrders,
};
