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
};

module.exports = {
  listProducts,
  getProduct,
  insertProduct,
};
