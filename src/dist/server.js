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
const Config_1 = __importDefault(require('./Config'));
const app_1 = __importDefault(require('./app'));
const main = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      mongoose_1.default.connect(Config_1.default.dataBase_url);
      app_1.default.listen(Config_1.default.port, () => {
        'Server is running on ' + Config_1.default.port + ' Port';
      });
    } catch (err) {
      console.log(err);
    }
  });
// main()
console.log(Config_1.default.port);
// console.log({path:path.join(process.cwd() + "/env/.env")})