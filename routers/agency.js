const express = require('express')
const router = express.Router() 
const agencycontroller = require("../controllers/agencyController")
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.route('/')
    .get(agencycontroller.getAllAgency)
    .post(upload.fields([{ name: 'photo_profile', maxCount: 1 },{ name: 'image_post', maxCount: 1 }]), agencycontroller.postAgency)
    .delete(agencycontroller.deleteAllAgency)

router.route('/:id')
    .get(agencycontroller.getAgencyByID)
    .delete(agencycontroller.deleteAgencyByID)
    .put(upload.fields([{ name: 'photo_profile', maxCount: 1 },{ name: 'image_post', maxCount: 1 }]), agencycontroller.putAgency)
module.exports = router