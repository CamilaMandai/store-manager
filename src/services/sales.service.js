const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');

const validateProductId = async (products) => {
  const productsBD = await productsModel.findAll();
  const errors = products
    .map((product) => productsBD.some((productBD) => Number(product.productId) === productBD.id));
  return errors.includes(false);
};

const insert = async (products) => {
  const errors = await validateProductId(products);
  if (errors) return { type: 'INVALID_ID', message: 'Product not found' };
  const saleInserted = await salesModel.insert(products);
  return { type: null, message: saleInserted };
};

module.exports = {
  insert,
};