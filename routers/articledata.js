const express = require('express')
const router = express.Router() 
const articledatacontroller = require("../controllers/articledataController")
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.route('/')
    .get(articledatacontroller.getAllarticle_data)
    .post(upload.fields([{ name: 'image_1', maxCount: 1 },{ name: 'image_2', maxCount: 1 },{ name: 'image_3', maxCount: 1 }]), articledatacontroller.postarticle_data)
    .delete(articledatacontroller.deletearticle_data)

router.route('/:id')
    .get(articledatacontroller.getarticle_databyID)
    .delete(articledatacontroller.deletearticle_databyID)
    .put(upload.fields([{ name: 'image_1', maxCount: 1 },{ name: 'image_2', maxCount: 1 },{ name: 'image_3', maxCount: 1 }]), articledatacontroller.putarticle_data)


module.exports = router