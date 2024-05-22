'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.joiProductValidate = void 0;
const joi_1 = __importDefault(require('joi'));
exports.joiProductValidate = joi_1.default.object({
  name: joi_1.default.string().min(3).required().messages({
    'string.base': `"name" should be a type of 'text'`,
    'string.empty': `"name" cannot be an empty field`,
    'string.min': `"name" should have a minimum length of {#limit}`,
    'any.required': `"name" is a required field`,
  }),
  description: joi_1.default.string().min(10).required().messages({
    'string.base': `"description" should be a type of 'text'`,
    'string.empty': `"description" cannot be an empty field`,
    'string.min': `"description" should have a minimum length of {#limit}`,
    'any.required': `"description" is a required field`,
  }),
  category: joi_1.default.string().required().messages({
    'string.base': `"Category" should be a type of 'text'`,
    'string.empty': `"Category" cannot be an empty field`,
    'any.required': `"Category" is a required field`,
  }),
  price: joi_1.default.number().required().messages({
    'number.base': `"price" should be a type of 'number'`,
    'any.required': `"price" is a required field`,
  }),
  tags: joi_1.default
    .array()
    .items(joi_1.default.string())
    .required()
    .messages({
      'array.base': `"Tags" should be an array.`,
      'any.required': `"Tags" is a required field.`,
      'array.includesRequiredUnknowns': `"Tags" must only contain strings.`,
    }),
  variants: joi_1.default
    .array()
    .items(
      joi_1.default.object({
        type: joi_1.default.string().required().messages({
          'any.required':
            'Type is required in variants object. Please provide a valid type.',
          'string.base': 'Type must be a string.',
        }),
        value: joi_1.default.string().required().messages({
          'any.required': 'Value is required. Please provide a valid value.',
          'string.base': 'Value must be a string.',
        }),
      }),
    )
    .required()
    .messages({
      'array.base': `"variants" should be an array`,
      'object.base': `Each item in "variants" should be an object`,
      'any.required': `"variants" is a required field`,
    }),
  inventory: joi_1.default
    .object()
    .keys({
      quantity: joi_1.default.number().integer().required().min(1).messages({
        'number.base': `"quantity" should be a type of 'number'`,
        'number.integer': `"quantity" should be an integer`,
        'number.min': `"quantity" should have a minimum value of {#limit}`,
        'any.required': `"quantity" is a required field in inventory`,
      }),
      inStock: joi_1.default.boolean().required().messages({
        'boolean.base': `"inStock" should be a type of 'boolean'`,
        'any.required': `"inStock" is a required field in inventory`,
      }),
    })
    .required()
    .messages({
      'object.base': `"Inventory" should be a type of 'text'`,
      'object.empty': `"Inventory" cannot be an empty field`,
      'any.required': `"Inventory" is a required field`,
    }),
});
