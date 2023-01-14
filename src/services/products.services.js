const productsModel = require('../models/products.model'); 
const inputValidation = require('./validations/inputValidation');

const findAll = async () => {
  const products = await productsModel.findAll();
  return { type: null, message: products };
};

const getById = async (id) => {
  const error = inputValidation.validateId(id);
  if (error.type) return error;

  const product = await productsModel.getById(id);
  // if (!product) return { type: 'Id not Found', message: 'Product not found' };

  return { type: null, message: product };
};

const insert = async (name) => {
  const error = inputValidation.validateInsertProduct(name);
  if (error.type) return error;
  const productId = await productsModel.insert({ name });
  const newProduct = await productsModel.getById(productId);
  return { type: null, message: { name: newProduct.name } };
};

module.exports = {
  findAll,
  getById,
  insert,
};