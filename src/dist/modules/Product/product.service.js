'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = __importDefault(require('mongoose'));
const product_model_1 = require('./product.model');
const createProductIntoDB = product =>
  __awaiter(void 0, void 0, void 0, function* () {
    console.log(product);
    return yield product_model_1.productModel.create(product);
  });
const getAllProducts = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.productModel.find();
  });
const getSingelProductById = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.productModel.findOne({
      _id: new mongoose_1.default.Types.ObjectId(id),
    });
  });
const updateSingelProductById = (id, updateData) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.productModel.updateOne(
      { _id: new mongoose_1.default.Types.ObjectId(id) },
      updateData,
    );
    if (result.modifiedCount) {
      return yield getSingelProductById(id);
    } else if (!result.acknowledged) {
      throw new Error('Update not successful!');
    } else if (!result.matchedCount) {
      throw new Error('Document not found');
    } else {
      return null;
    }
  });
const deleteSingleProductById = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.productModel.deleteOne({
      _id: new mongoose_1.default.Types.ObjectId(id),
    });
  });
const searchProductByText = text =>
  __awaiter(void 0, void 0, void 0, function* () {
    return yield product_model_1.productModel.find({
      $text: { $search: text },
    });
  });
exports.default = {
  createProductIntoDB,
  getAllProducts,
  getSingelProductById,
  updateSingelProductById,
  deleteSingleProductById,
  searchProductByText,
};
