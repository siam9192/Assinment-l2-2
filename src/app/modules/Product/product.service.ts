import mongoose from 'mongoose';
import { Product } from './product.interface';
import { productModel } from './product.model';

const createProductIntoDB = async (product: Product) => {
  console.log(product);
  return await productModel.create(product);
};
const getAllProducts = async () => {
  return await productModel.find();
};

const getSingelProductById = async (id: string) => {
  return await productModel.findOne({ _id: new mongoose.Types.ObjectId(id) });
};

const updateSingelProductById = async (id: string, updateData: any) => {
  const result = await productModel.updateOne(
    { _id: new mongoose.Types.ObjectId(id) },
    updateData,
  );

  if (result.modifiedCount) {
    return await getSingelProductById(id);
  } else if (!result.acknowledged) {
    throw new Error('Update not successful!');
  } else if (!result.matchedCount) {
    throw new Error('Document not found');
  } else {
    return null;
  }
};

const deleteSingleProductById = async (id: string) => {
  return await productModel.deleteOne({ _id: new mongoose.Types.ObjectId(id) });
};

const searchProductByText = async (text: string) => {
  return await productModel.find({ $text: { $search: text } });
};

export default {
  createProductIntoDB,
  getAllProducts,
  getSingelProductById,
  updateSingelProductById,
  deleteSingleProductById,
  searchProductByText,
};
