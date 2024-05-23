"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderModel = void 0;
const product_model_1 = require("../Product/product.model");
const mongoose_1 = __importStar(require("mongoose"));
const orderSchema = new mongoose_1.Schema({
    email: String,
    productId: String,
    price: Number,
    quantity: Number,
});
orderSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = this;
        const product = yield product_model_1.productModel.findOne({
            _id: new mongoose_1.default.Types.ObjectId(this.productId),
        });
        //   If product is not  available   or ordered quantity is not available then give the error otherwise accept the order inventory and accept the order
        if (!product) {
            throw new Error('Order not found');
        }
        else if (!product.inventory.inStock ||
            order.quantity > product.inventory.quantity) {
            throw new Error('Insufficient quantity available in inventory');
        }
        next();
    });
});
orderSchema.post('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield product_model_1.productModel.findOne({
            _id: new mongoose_1.default.Types.ObjectId(this.productId),
        });
        const updatedDoc = {
            quantity: product.inventory.quantity - this.quantity,
            inStock: product.inventory.quantity - this.quantity === 0 ? false : true,
        };
        //  Update the product new quantity and inStock status
        yield product_model_1.productModel.updateOne({ _id: product._id }, {
            $set: {
                inventory: updatedDoc,
            },
        });
    });
});
exports.orderModel = (0, mongoose_1.model)('orders', orderSchema);
