const productsModel = require('../models/products.model');

const checkProductId = async (req, res, next) => {
  const { id } = req.params;
  const result = await productsModel.getById(id);
  if (!result) return res.status(404).json({ message: 'Product not found' });

  return next();
};

const checkProductName = async (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  next();
};

module.exports = {
  checkProductId,
  checkProductName,
};