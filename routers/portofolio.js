const express = require('express')
const router = express.Router() 
const portofoliocontroller = require("../controllers/portofolioController")
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.route('/')
    .get(portofoliocontroller.getAllportofolio)
    .post(upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'content1', maxCount: 1 }, { name: 'content2', maxCount: 1 }]), portofoliocontroller.postportofolio)
    .delete(portofoliocontroller.deleteportofolio)

router.route('/:id')
    .get(portofoliocontroller.getportofoliobyID)
    .delete(portofoliocontroller.deleteportofoliobyID)
    .put(upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'content1', maxCount: 1 }, { name: 'content2', maxCount: 1 }]), portofoliocontroller.putportofolio)
 

module.exports = router