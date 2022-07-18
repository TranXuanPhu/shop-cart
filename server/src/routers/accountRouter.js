const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/userController.js');

router.post('/register', userController.register);

module.exports = router;
