const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register
router.route('/register').post(userController.register);

// Login
router.route('/login').post(userController.login);

router.route('/update').put(userController.update);

module.exports = router;
