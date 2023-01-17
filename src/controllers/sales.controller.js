const salesServices = require('../services/sales.services');

const findAll = async (req, res) => {
  const sales = await salesServices.findAll();
  return res.status(200).json(sales.message[0]);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesServices.getById(id);
  if (sale.type) return res.status(404).json({ message: sale.message });
    return res.status(200).json(sale.message);
};

const insertSale = async (req, res) => {
  const products = req.body;
  const saleInserted = await salesServices.insert(products);
  if (saleInserted.type) {
    return res.status(404).json({ message: saleInserted.message });
  }
  return res.status(201).json(saleInserted.message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesServices.deleteSale(id);
  if (type) return res.status(404).json({ message });
  return res.status(204).json();
};

module.exports = {
  findAll,
  getById,
  insertSale,
  deleteSale,
};