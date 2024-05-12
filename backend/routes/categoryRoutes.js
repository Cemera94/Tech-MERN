const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController.js');

router.route('/:title').get(categoryController.getProductsByCategory);
router.route('/filter/:title').get(categoryController.getCategory);

module.exports = router;
