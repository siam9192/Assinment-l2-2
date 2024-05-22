import { Request, Response } from 'express';
import orderService from './order.service';
import { joiOrderValidate } from './order.validation.joi';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const { value, error } = joiOrderValidate.validate(order);

    if (error) {
      throw new Error(error.message.replace(/"/g,''));
    }
    // await orderMiddleware.handleOrders(req);
    const result = await orderService.createOrderIntoDB(value);

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
  const queryLength = (Object.keys(req.query)).length
  
  //  If search with email  query, the product will be  search with the email query value other wise it will give all the order document of the orders collection
  if (email) {
    getOrdersByEmail(req, res);
  } else if(!queryLength) {
    getAllOrders(req, res);
  }
  else{
    res.status(400).json({
      success:false,
      message:"Route not found!"
    })
  }
};

export default {
  createOrder,
  getOrders,
};
