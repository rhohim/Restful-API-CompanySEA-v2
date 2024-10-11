const express = require('express')
const router = express.Router()
const highlightcontroller = require("../controllers/highlightportfolioController")

router.route('/')
    .post(highlightcontroller.posthighlight)
    .get(highlightcontroller.getAllhighlight)
    .delete(highlightcontroller.deletehighlight)

router.route('/:id')
    .delete(highlightcontroller.deletehiglightbyID)
    .get(highlightcontroller.gethighlightbyslug)

module.exports = router