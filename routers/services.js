const express = require('express')
const router = express.Router() 
const servicescontroller = require("../controllers/servicesController")
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.route('/')
    .get(servicescontroller.getAllservices)
    .post(upload.fields([{ name: 'cover', maxCount: 1 }]), servicescontroller.postservices)
    .delete(servicescontroller.deleteservices)

router.route('/:id')
    .get(servicescontroller.getservicesbyID)
    .delete(servicescontroller.deleteservicesbyID)
    .put(upload.fields([{ name: 'cover', maxCount: 1 }]), servicescontroller.putservices)
    





module.exports = router