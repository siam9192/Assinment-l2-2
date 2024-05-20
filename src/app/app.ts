import express from 'express';
import cors from 'cors';
import productRouter from '../app/modules/Product/product.router'
const app = express();

app.use(express.json());

app.use(cors());
app.use('/api',productRouter)
export default app;
