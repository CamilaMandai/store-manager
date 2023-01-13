const productsModel = require('../models/products.model');

const checkProductId = async (req, res, next) => {
  const { id } = req.params;
  const result = await productsModel.getById(id);
  if (!result) return res.status(404).json({ message: 'Product not found' });

  return next();
};

module.exports = {
  checkProductId,
};