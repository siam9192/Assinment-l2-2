import express from 'express';
import productController from './product.controller';

const router = express.Router();

router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:productId', productController.getSingelProductById);
router.put('/:productId', productController.updateSingelProductById);
router.delete('/:productId', productController.deleteSingleProductById);

export default router;
