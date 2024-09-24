const express = require('express')
const router = express.Router()
const highlightclientcontroller = require("../controllers/highlightclientController")

router.route('/')
    .post(highlightclientcontroller.posthighlightClient)
    .get(highlightclientcontroller.getAllhighlightClient)
    .delete(highlightclientcontroller.deletehighlightClient)

router.route('/:id')
    .delete(highlightclientcontroller.deletehiglightClientbyID)

module.exports = router