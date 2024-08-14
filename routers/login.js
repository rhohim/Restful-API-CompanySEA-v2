const express = require('express');
const router = express.Router();
const userController = require('../controllers/loginController');

// Route for user login

router.route('/')
    .post(userController.postlogin);

module.exports = router;