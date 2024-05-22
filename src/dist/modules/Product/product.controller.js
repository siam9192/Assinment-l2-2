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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = __importDefault(require("./product.service"));
const product_joi_validation_1 = require("./product.joi.validation");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        // Validate the product using Joi validation package
        const { error } = product_joi_validation_1.joiProductValidate.validate(product);
        // If validation is unsuccessful it will give an error
        if (error) {
            throw new Error(error.message.replace(/"/g, ""));
        }
        // Insert Product into document and send the response
        const result = yield product_service_1.default.createProductIntoDB(product);
        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message || 'Something went wrong',
        });
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.default.getAllProducts();
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message || 'Something went wrong',
        });
    }
});
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const text = req.query.searchTerm;
    const queryLength = (Object.keys(req.query)).length;
    //  If search with searchTerm  query, the product will be  search with the query value other wise it will give all the products of the products collection
    if (text) {
        searchProductByText(req, res);
    }
    else if (!queryLength) {
        getAllProducts(req, res);
    }
    else {
        res.status(400).json({
            success: false,
            message: "Route not found!"
        });
    }
});
//
const getSingelProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield product_service_1.default.getSingelProductById(productId);
        res.status(200).json({
            success: true,
            message: 'Product fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message || 'Something went wrong',
        });
    }
});
const updateSingelProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const data = req.body;
        const result = yield product_service_1.default.updateSingelProductById(productId, data);
        console.log(result);
        res.status(200).json({
            success: true,
            message: 'Product updated successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message || 'Something went wrong',
        });
    }
});
const deleteSingleProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield product_service_1.default.deleteSingleProductById(productId);
        //  If product document has been successfully deleted
        if (result.deletedCount) {
            res.status(200).json({
                success: true,
                message: 'Product deleted successfully!',
                data: null,
            });
        }
        else {
            res.status(200).json({
                success: false,
                message: 'Product not found',
            });
        }
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message || 'Something went wrong',
        });
    }
});
const searchProductByText = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const text = req.query.searchTerm;
        const result = yield product_service_1.default.searchProductByText(text);
        res.status(200).json({
            success: true,
            message: `Products matching search term ${text} fetched successfully!`,
            data: result,
        });
    }
    catch (err) {
        res.status(200).json({
            success: false,
            message: err.message || 'Something went wrong',
        });
    }
});
exports.default = {
    createProduct,
    getAllProducts,
    getSingelProductById,
    updateSingelProductById,
    deleteSingleProductById,
    searchProductByText,
    getProducts,
};
