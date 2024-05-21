'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const product_controller_1 = __importDefault(require('./product.controller'));
const router = express_1.default.Router();
router.post('/', product_controller_1.default.createProduct);
router.get('/', product_controller_1.default.getProducts);
router.get('/:productId', product_controller_1.default.getSingelProductById);
router.put('/:productId', product_controller_1.default.updateSingelProductById);
router.delete(
  '/:productId',
  product_controller_1.default.deleteSingleProductById,
);
exports.default = router;
