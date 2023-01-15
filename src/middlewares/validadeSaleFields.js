const validadeIdField = (req, res, next) => {
  const products = req.body;
  for (let index = 0; index < products.length; index += 1) {
    if (!products[index].productId) {
      return res.status(400).json({ message: '"productId" is required' });
    }
  }
  return next();
};

const validadeQuantityField = (req, res, next) => {
  const products = req.body;
  for (let index = 0; index < products.length; index += 1) {
    if (Number(products[index].quantity) < 1) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    if (!products[index].quantity) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
  }
  return next();
};

module.exports = {
  validadeIdField,
  validadeQuantityField,
};