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
const order_service_1 = __importDefault(require('./order.service'));
const order_middleware_1 = __importDefault(require('./order.middleware'));
const createOrder = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const order = req.body;
      yield order_middleware_1.default.handleOrders(req);
      const result = yield order_service_1.default.createOrderIntoDB(order);
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: result,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || 'Something went wrong',
      });
    }
  });
const getAllOrders = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const result = yield order_service_1.default.getAllOrderFromDB();
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
        data: result,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || 'Something went wrong',
      });
    }
  });
const getOrdersByEmail = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const email = req.query.email;
      const result =
        yield order_service_1.default.getOrdersByEmailFromDB(email);
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: err.message || 'Something went wrong',
      });
    }
  });
const getOrders = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    //  If search with email  query, the product will be  search with the email query value other wise it will give all the order document of the orders collection
    if (email) {
      getOrdersByEmail(req, res);
    } else {
      getAllOrders(req, res);
    }
  });
exports.default = {
  createOrder,
  getOrders,
};
