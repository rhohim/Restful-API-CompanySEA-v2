const express = require('express')
const router = express.Router() 
const tiktokdatacontroller = require("../controllers/tiktokdataController")
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.route('/')
    .get(tiktokdatacontroller.getAlltiktok_data)
    .post(upload.fields([{ name: 'image_1', maxCount: 1 },{ name: 'image_2', maxCount: 1 },{ name: 'image_3', maxCount: 1 }]), tiktokdatacontroller.posttiktok_data)
    .delete(tiktokdatacontroller.deletetiktok_data)

router.route('/:id')
    .get(tiktokdatacontroller.gettiktok_databyID)
    .delete(tiktokdatacontroller.deletetiktok_databyID)
    .put(upload.fields([{ name: 'image_1', maxCount: 1 },{ name: 'image_2', maxCount: 1 },{ name: 'image_3', maxCount: 1 }]), tiktokdatacontroller.puttiktok_data)




module.exports = router