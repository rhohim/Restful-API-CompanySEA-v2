const express = require('express')  
const router = express.Router() 
const randomimgcontroller = require("../controllers/randomimgController")
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });


router.route('/')
    .get(randomimgcontroller.getAllrandom_img)
    .post(upload.fields([{ name: 'image', maxCount: 1 }]), randomimgcontroller.postrandom_img)
    .delete(randomimgcontroller.deleterandom_img)

router.route('/:id')
    .get(randomimgcontroller.getrandom_imgbyID)
    .delete(randomimgcontroller.deleterandom_imgbyID)
    .put(upload.fields([{ name: 'image', maxCount: 1 }]), randomimgcontroller.putrandom_img)

module.exports = router