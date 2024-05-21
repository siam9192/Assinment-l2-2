import Joi from 'joi';
export const joiProductValidate = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.base': `"name" should be a type of 'text'`,
    'string.empty': `"name" cannot be an empty field`,
    'string.min': `"name" should have a minimum length of {#limit}`,
    'any.required': `"name" is a required field`,
  }),
  description: Joi.string().min(10).required().messages({
    'string.base': `"description" should be a type of 'text'`,
    'string.empty': `"description" cannot be an empty field`,
    'string.min': `"description" should have a minimum length of {#limit}`,
    'any.required': `"description" is a required field`,
  }),
  category: Joi.string().required().messages({
    'string.base': `"description" should be a type of 'text'`,
    'string.empty': `"description" cannot be an empty field`,
    'any.required': `"description" is a required field`,
  }),
  price: Joi.number().required().messages({
    'number.base': `"price" should be a type of 'number'`,
    'any.required': `"price" is a required field`,
  }),
  tags: Joi.array().items(Joi.string()).required().messages({
    'array.base': `"tags" should be an array`,
    'any.required': `"tags" is a required field`,
  }),
  variants: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().required(),
        value: Joi.string().required(),
      }),
    )
    .messages({
      'array.base': `"variants" should be an array`,
      'object.base': `Each item in "variants" should be an object`,
    }),
  inventory: Joi.object().keys({
    quantity: Joi.number().integer().required().min(1).messages({
      'number.base': `"quantity" should be a type of 'number'`,
      'number.integer': `"quantity" should be an integer`,
      'number.min': `"quantity" should have a minimum value of {#limit}`,
      'any.required': `"quantity" is a required field`,
    }),
    inStock: Joi.boolean().required().messages({
      'boolean.base': `"inStock" should be a type of 'boolean'`,
      'any.required': `"inStock" is a required field`,
    }),
  }),
});
