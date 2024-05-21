import Joi from 'joi';
export const joiOrderValidate = Joi.object({
  email: Joi.string().email().required().messages({
    'string.base': `Email must be a string`,
    'email.base': `Given value is not an email `,
    'required.base': `Email is required`,
  }),

  productId: Joi.string().required().messages({
    'string.base': `Product ID must be a string`,
    'required.base': `Product ID is required`,
  }),
  price: Joi.number().required().messages({
    'number.base': `Price must be a number`,

    'required.base': `Price is required`,
  }),
  quantity: Joi.number().integer().min(1).required().messages({
    'number.base': `Quantity must be a number`,
    'integer.base': `Quantity must be an integer type `,
    'required.base': `Quantity is required`,
  }),
});
