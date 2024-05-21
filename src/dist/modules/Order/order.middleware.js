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
const Config_1 = __importDefault(require('../../Config'));
//  this is a  function that will check the product quantity and give  the response based on the result
const handleOrders = req =>
  __awaiter(void 0, void 0, void 0, function* () {
    const order = req.body;
    yield mongoose_1.default.connect(Config_1.default.dataBase_url);
    const collection = mongoose_1.default.connection.db.collection('products');
    // Find the product by  product id
    const product = yield collection.findOne({
      _id: new mongoose_1.default.Types.ObjectId(order.productId),
    });
    //   If product is not  available   or ordered quantity is not available then give the error otherwise update the product inventory and accept the order
    if (!product) {
      throw new Error('Product not found');
    } else if (
      !product.inventory.inStock ||
      order.quantity > product.inventory.quantity
    ) {
      throw new Error('Insufficient quantity available in inventory');
    } else {
      const updatedDoc = {
        quantity: product.inventory.quantity - order.quantity,
        inStock:
          product.inventory.quantity - order.quantity === 0 ? false : true,
      };
      yield collection.updateOne(
        { _id: product._id },
        {
          $set: {
            inventory: updatedDoc,
          },
        },
      );
    }
  });
exports.default = {
  handleOrders,
};
