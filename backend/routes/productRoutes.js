const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.route('/').get(productController.getAllProducts);
router.route('/single-product/:id').get(productController.getSingleProduct);

module.exports = router;
