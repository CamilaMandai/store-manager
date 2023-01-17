const salesModel = require('../models/sales.model');
const productsModel = require('../models/products.model');

const findAll = async () => {
  const sales = await salesModel.findAll();
  return { message: sales };
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  if (sale.length === 0) return { type: 'INVALID_ID', message: 'Sale not found' };
  return { type: null, message: sale };
};

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

const validateSaleId = async (id) => {
  const sale = await salesModel.getById(id);
  if (sale.length === 0) return true;
  return false;
};

const deleteSale = async (id) => {
  const error = await validateSaleId(id);
  if (error) return { type: 'INVALID_ID', message: 'Sale not found' };
  await salesModel.deleteSale(id);
  return { type: null, message: 'Sale deleted' };
};

const update = async (id, products) => {
  const errors = await validateProductId(products);
  if (errors) return { type: 'INVALID_ID', message: 'Product not found' };
  const error = await validateSaleId(id);
  if (error) return { type: 'INVALID_ID', message: 'Sale not found' };
  const updatedSale = await salesModel.update(id, products);
  return { type: null, message: updatedSale };
};

module.exports = {
  findAll,
  getById,
  insert,
  deleteSale,
  update,
};