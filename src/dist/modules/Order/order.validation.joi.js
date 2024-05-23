"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joiOrderValidate = void 0;
const joi_1 = __importDefault(require("joi"));
exports.joiOrderValidate = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        'string.base': `Email must be a string`,
        'email.base': `Given value is not an email `,
        'required.base': `Email is required`,
    }),
    productId: joi_1.default.string().required().messages({
        'string.base': `Product ID must be a string`,
        'required.base': `Product ID is required`,
    }),
    price: joi_1.default.number().required().messages({
        'number.base': `Price must be a number`,
        'required.base': `Price is required`,
    }),
    quantity: joi_1.default.number().integer().min(1).required().messages({
        'number.base': `Quantity must be a number`,
        'integer.base': `Quantity must be an integer type `,
        'required.base': `Quantity is required`,
    }),
});
