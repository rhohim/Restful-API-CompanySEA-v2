const express = require('express')
const router = express.Router() 
const divisioncontroller = require("../controllers/divisionController")
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.route('/')
    .get(divisioncontroller.getAlldivision)
    .post(upload.fields([{ name: 'image', maxCount: 1 }]), divisioncontroller.postdivision)
    .delete(divisioncontroller.deletedivision)

router.route('/:id')
    .put(upload.fields([{ name: 'image', maxCount: 1 }]), divisioncontroller.putdivision)
    .get(divisioncontroller.getdivisionbyID)
    .delete(divisioncontroller.deletedivisionbyID)

module.exports = router