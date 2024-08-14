const express = require('express')
const router = express.Router()
const interncontactcontroller = require("../controllers/interncontactController")

router.route('/')
    .get(interncontactcontroller.getAllintern_contact)
    .post(interncontactcontroller.postintern_contact)
    .delete(interncontactcontroller.deleteintern_contact)

router.route('/:id')
    .put(interncontactcontroller.putintern_contact)
    .get(interncontactcontroller.getAllintern_contactbyID)
    .delete(interncontactcontroller.deleteintern_contactbyID)


module.exports = router