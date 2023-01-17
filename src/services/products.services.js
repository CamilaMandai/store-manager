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
  return { type: null, message: newProduct };
};

const update = async (id, name) => {
  await productsModel.update(id, name);
  const updatedProduct = await productsModel.getById(id);
  return { type: null, message: updatedProduct };
};

const deleteProduct = async (id) => {
  await productsModel.deleteProduct(id);
  // return { type: null, message: null };
};

const search = async (q) => {
  if (!q) {
    const allProducts = await productsModel.findAll();
    return { type: null, message: allProducts };
  }
  const products = await productsModel.search(q);
  return { type: null, message: products[0] };
};

module.exports = {
  findAll,
  getById,
  insert,
  update,
  deleteProduct,
  search,
};