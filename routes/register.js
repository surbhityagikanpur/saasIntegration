const path = require('path');

const express = require('express');

const registerController = require('../controllers/register');
const isAuth = require('../middleware/auth');

const router = express.Router();

router.post('/', registerController.subToken);

router.get('/register', registerController.registerView)

// /admin/add-product => GET
router.post('/register', registerController.registerCustomer);

// /admin/products => GET
router.post('/login', registerController.loginCustomer);

module.exports = router;
