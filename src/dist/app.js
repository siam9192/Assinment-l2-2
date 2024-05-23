"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = __importDefault(require("./modules/Product/product.route"));
const order_route_1 = __importDefault(require("./modules/Order/order.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/products', product_route_1.default);
app.use('/api/orders', order_route_1.default);
app.use((req, res) => {
    if (req.url !== '/') {
        res.status(400).json({
            success: false,
            message: 'Route not found',
        });
    }
    else {
        res.status(200).json({
            message: 'Welcome to Ecommerce management server ',
        });
    }
});
exports.default = app;
