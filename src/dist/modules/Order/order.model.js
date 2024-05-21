'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.orderModel = void 0;
const mongoose_1 = require('mongoose');
const orderSchema = new mongoose_1.Schema({
  email: String,
  productId: String,
  price: String,
  quantity: String,
});
orderSchema.pre('save', function () {
  console.log(this);
});
exports.orderModel = (0, mongoose_1.model)('orders', orderSchema);
