const productsServices = require('../services/products.services');

const listProducts = async (_req, res) => {
  const { type, message } = await productsServices.findAll();

  if (type) return res.status(404).json(message);

  return res.status(200).json(message);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsServices.getById(id);
  if (type) return res.status(404).json(message);
  return res.status(200).json(message);
};

const insertProduct = async (req, res) => {
  const { name } = req.body;

  const { type, message } = await productsServices.insert(name);
  if (type) {
    return res
      .status(422)
      .json(message);
  } 
  return res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { message } = await productsServices.update(id, name);
  return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  productsServices.deleteProduct(id);
  return res.status(204).json();
};

module.exports = {
  listProducts,
  getProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
};
