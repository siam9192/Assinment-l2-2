import mongoose from 'mongoose';
import { Request } from 'express';
import Config from '../../Config';

//  this is a  function that will check the product quantity and give  the response based on the result

const handleOrders = async (req: Request) => {
  const order = req.body;
  await mongoose.connect(Config.dataBase_url as string);

  const collection = mongoose.connection.db.collection('products');

  // Find the product by  product id

  const product = await collection.findOne({
    _id: new mongoose.Types.ObjectId(order.productId),
  });

  //   If product is not  available   or ordered quantity is not available then give the error otherwise update the product inventory and accept the order
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
