import { Request, Response } from 'express';
import orderService from './order.service';
import orderMiddleware from './order.middleware';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;

    await orderMiddleware.handleOrders(req, res);
    const result = await orderService.createOrderIntoDB(order);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Something went wrong',
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getAllOrderFromDB();
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Something went wrong',
    });
  }
};

const getOrdersByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;
    const result = await orderService.getOrdersByEmailFromDB(email as string);
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully for user email!',
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Something went wrong',
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  const email = req.query.email;
  //  If search with email  query, the product will be  search with the email query value other wise it will give all the order document of the orders collection
  if (email) {
    getOrdersByEmail(req, res);
  } else {
    getAllOrders(req, res);
  }
};

export default {
  createOrder,
  getOrders,
};
