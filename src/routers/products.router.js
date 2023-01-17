const express = require('express');
const productsController = require('../controllers/products.controller');
const validateProductFields = require('../middlewares/validateProductFields');

const router = express.Router();

router.get('/', productsController.listProducts);

router.get('/search', productsController.search);

router.get('/:id', validateProductFields.checkProductId, productsController.getProduct);

router.post('/', validateProductFields.checkProductName, productsController.insertProduct);

router.put('/:id',
  validateProductFields.checkProductId,
  validateProductFields.checkProductName,
  productsController.updateProduct);

router.delete('/:id',
  validateProductFields.checkProductId,
  productsController.deleteProduct);

module.exports = router;