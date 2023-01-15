const salesServices = require('../services/sales.service');

const insertSale = async (req, res) => {
  const products = req.body;
  const saleInserted = await salesServices.insert(products);
  if (saleInserted.type) {
    return res.status(404).json({ message: saleInserted.message });
  }
  return res.status(201).json(saleInserted.message);
};

module.exports = {
  insertSale,
};