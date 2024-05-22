"use strict";
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
const order_model_1 = require("./order.model");
const createOrderIntoDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.orderModel.create(order);
});
const getAllOrderFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.orderModel.find();
});
const getOrdersByEmailFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.orderModel.find({ email });
});
exports.default = {
    createOrderIntoDB,
    getAllOrderFromDB,
    getOrdersByEmailFromDB,
};
