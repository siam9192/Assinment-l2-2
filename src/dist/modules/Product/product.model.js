"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const mongoose_1 = require("mongoose");
const variantsSchema = new mongoose_1.Schema({ type: String, value: String });
const inventorySchema = new mongoose_1.Schema({
    quantity: Number,
    inStock: Boolean,
});
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    variants: {
        type: [variantsSchema],
        required: true,
    },
    inventory: inventorySchema,
});
productSchema.index({
    name: 'text',
    description: 'text',
    tags: 'text',
    category: 'text',
});
exports.productModel = (0, mongoose_1.model)('Products', productSchema);
