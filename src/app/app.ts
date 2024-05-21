import express from 'express';
import cors from 'cors';
import productRouter from '../app/modules/Product/product.router';
import orderRouter from '../app/modules/Order/order.router';
const app = express();

app.use(express.json());

app.use(cors());
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
export default app;
