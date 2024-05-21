import { Request, Response } from 'express';
import productService from './product.service';
import { Product } from './product.interface';
import { joiProductValidate } from './product.joi.validation';
import orderMiddleware from '../Order/order.middleware';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product: Product = req.body;
    const { value, error } = joiProductValidate.validate(product);
    if (error) {
      throw new Error(error.message);
    }

    const result = await productService.createProductIntoDB(product);
    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message || 'Something went wrong',
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productService.getAllProducts();
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message || 'Something went wrong',
    });
  }
};

const getProducts = async (req: Request, res: Response) => {
  const text = req.query.searchTerm;

  if (text) {
    searchProductByText(req, res);
  } else {
    getAllProducts(req, res);
  }
};
const getSingelProductById = async (req: Request, res: Response) => {
  try {
    const productId: string = req.params.productId;
    const result = await productService.getSingelProductById(productId);
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message || 'Something went wrong',
    });
  }
};

const updateSingelProductById = async (req: Request, res: Response) => {
  try {
    const productId: string = req.params.productId;
    const data = req.body;
    const result = await productService.updateSingelProductById(
      productId,
      data,
    );
    console.log(result);

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message || 'Something went wrong',
    });
  }
};

const deleteSingleProductById = async (req: Request, res: Response) => {
  try {
    const productId: string = req.params.productId;
    const result = await productService.deleteSingleProductById(productId);

    if (result.deletedCount) {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
        data: null,
      });
    } else {
      res.status(200).json({
        success: false,
        message: 'Product not found',
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message || 'Something went wrong',
    });
  }
};

const searchProductByText = async (req: Request, res: Response) => {
  try {
    const text: string = req.query.searchTerm;

    const result = await productService.searchProductByText(text);

    res.status(200).json({
      success: true,
      message: `Products matching search term ${text} fetched successfully!`,
      data: result,
    });
  } catch (err) {
    res.status(200).json({
      success: false,
      message: err.message || 'Something went wrong',
    });
  }
};
export default {
  createProduct,
  getAllProducts,
  getSingelProductById,
  updateSingelProductById,
  deleteSingleProductById,
  searchProductByText,
  getProducts,
};
