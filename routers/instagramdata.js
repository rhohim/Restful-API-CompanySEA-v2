const express = require('express')
const router = express.Router() 
const instgramdatacontroller = require("../controllers/instagramdataController")
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.route('/')
    .get(instgramdatacontroller.getAllig_data)
    .post(upload.fields([{ name: 'image_1', maxCount: 1 },{ name: 'image_2', maxCount: 1 },{ name: 'image_3', maxCount: 1 }]), instgramdatacontroller.postig_data)
    .delete(instgramdatacontroller.deleteig_data)

router.route('/:id')
    .get(instgramdatacontroller.getig_databyID)
    .delete(instgramdatacontroller.deleteig_databyID)
    .put(upload.fields([{ name: 'image_1', maxCount: 1 },{ name: 'image_2', maxCount: 1 },{ name: 'image_3', maxCount: 1 }]), instgramdatacontroller.putig_data)


module.exports = router