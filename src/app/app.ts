import express from 'express';
import cors from 'cors';
import productRouter from './modules/Product/product.route';
import orderRouter from './modules/Order/order.route';
const app = express();

app.use(express.json());

app.use(cors());
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use((req, res) => {
  res.status(400).json({
    success: false,
    message: 'Route not found',
  });
});
export default app;
