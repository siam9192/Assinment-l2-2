import { Order } from './order.interface';
import { orderModel } from './order.model';

const createOrderIntoDB = async (order: Order) => {
  return await orderModel.create(order);
};
const getAllOrderFromDB = async () => {
  return await orderModel.find();
};

const getOrdersByEmailFromDB = async (email: string) => {
  return await orderModel.find({ email });
};

export default {
  createOrderIntoDB,
  getAllOrderFromDB,
  getOrdersByEmailFromDB,
};
