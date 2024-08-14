const express = require('express')
const router = express.Router() 
const youtubedatacontroller = require("../controllers/youtubedataController")
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.route('/')
    .get(youtubedatacontroller.getAllyoutube_data)
    .post(upload.fields([{ name: 'image_1', maxCount: 1 },{ name: 'image_2', maxCount: 1 },{ name: 'image_3', maxCount: 1 }]), youtubedatacontroller.postyoutube_data)
    .delete(youtubedatacontroller.deleteyoutube_data)

router.route('/:id')
    .get(youtubedatacontroller.getyoutube_databyID)
    .delete(youtubedatacontroller.deleteyoutube_databyID)
    .put(upload.fields([{ name: 'image_1', maxCount: 1 },{ name: 'image_2', maxCount: 1 },{ name: 'image_3', maxCount: 1 }]), youtubedatacontroller.putyoutube_data)


module.exports = router