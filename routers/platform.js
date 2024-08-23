const express = require('express')
const router = express.Router()
const platformcontroller = require("../controllers/platformController")

router.route("/")
    .get(platformcontroller.getAllplatform)
    .post(platformcontroller.postplatform)
    .delete(platformcontroller.deleteplatform)

router.route("/:id")
    .put(platformcontroller.putplatform)
    .get(platformcontroller.getAllplatformbyID)
    .delete(platformcontroller.deleteplatformbyID)

module.exports = router