const express = require('express');
const productsController = require('../controllers/products.controller');
const validateProductFields = require('../middlewares/validateProductFields');

const router = express.Router();

router.get('/', productsController.listProducts);

router.get('/:id', validateProductFields.checkProductId, productsController.getProduct);

router.post('/', validateProductFields.checkProductName, productsController.insertProduct);

router.put('/:id', validateProductFields.checkProductId, productsController.updateProduct);

module.exports = router;