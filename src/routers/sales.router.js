const express = require('express');
const salesController = require('../controllers/sales.controller');
const validadeSaleFields = require('../middlewares/validadeSaleFields');

const router = express.Router();

router.get('/', salesController.findAll);

router.get('/:id', salesController.getById);

router.post('/',
  validadeSaleFields.validadeIdField,
  validadeSaleFields.validadeQuantityField,
  salesController.insertSale);

router.delete('/:id', salesController.deleteSale);

module.exports = router;
