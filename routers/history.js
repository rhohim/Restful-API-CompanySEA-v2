const express = require('express')
const router = express.Router() 
const historycontroller = require("../controllers/historyController")
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


router.route('/')
    .get(historycontroller.getAllhistory)
    .post(upload.fields([{ name: 'image', maxCount: 1 },{ name: 'background_image', maxCount: 1 }]), historycontroller.posthistory)
    .delete(historycontroller.deletehistory)

router.route('/:id')
    .put(upload.fields([{ name: 'image', maxCount: 1 },{ name: 'background_image', maxCount: 1 }]), historycontroller.puthistory)
    .get(historycontroller.gethistorybyID)
    .delete(historycontroller.deletehistorybyID)





module.exports=router