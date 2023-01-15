const express = require('express');
const salesController = require('../controllers/sales.controller');
const validadeSaleFields = require('../middlewares/validadeSaleFields');

const router = express.Router();

router.post('/',
  validadeSaleFields.validadeIdField,
  validadeSaleFields.validadeQuantityField,
  salesController.insertSale);

module.exports = router;
