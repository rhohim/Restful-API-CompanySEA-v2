const express = require('express')
const router = express.Router() 
const interncontroller = require("../controllers/internbatchController")
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.route('/')
    .get(interncontroller.getAllintern_batch)
    .post(upload.fields([{ name: 'image', maxCount: 1 }]), interncontroller.postintern_batch)
    .delete(interncontroller.deleteintern_batch)

router.route('/:id')
    .get(interncontroller.getintern_batchbyID)
    .delete(interncontroller.deleteintern_batchbyID)
    .put(upload.fields([{ name: 'image', maxCount: 1 }]), interncontroller.putintern_batch)


module.exports = router