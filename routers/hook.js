const express = require('express');
const router = express.Router();
const hookController = require("../controllers/hooklogin");
const { route } = require('./login');

router.route('/')
    .get(hookController.getlogin)

module.exports = router