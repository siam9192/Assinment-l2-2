import express from 'express'
import productController from './product.controller';

const router = express.Router();

router.post('/products',productController.createProduct)
router.get('/products',productController.getProducts)
router.get('/products/:productId',productController.getSingelProductById)
router.put('/products/:productId',productController.updateSingelProductById)
router.delete('/products/:productId',productController.deleteSingleProductById)

export default router