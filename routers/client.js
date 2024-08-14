const express = require('express')
const router = express.Router() 
const clientcontroller = require("../controllers/clientController")
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.route('/')
    .get(clientcontroller.getAllclient)
    .post(upload.fields([{ name: 'logo', maxCount: 1 }]), clientcontroller.postclient)
    .delete(clientcontroller.deleteclient)

router.route('/:id')
    .put(upload.fields([{ name: 'logo', maxCount: 1 }]), clientcontroller.putclient)
    .get(clientcontroller.getclientbyID)
    .delete(clientcontroller.deleteclientbyID)


module.exports=router