const { idSchema, insertProductSchema } = require('./schemas');
// const productsModel = require('../../models/products.model');

const validateId = async (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: '"id" must be a number' };

  // const product = await productsModel.getById(id);
  // if (!product) return { type: 'id not found', message: 'Product not found' };

  return { type: null, message: '' };
};

const validateInsertProduct = async (product) => {
  const { error } = insertProductSchema.validate(product);
  if (error) {
    return {
      type: 'INVALID_PRODUCT_VALUE', message: '"name" length must be at least 5 characters long',
    };
  }
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateInsertProduct,
};