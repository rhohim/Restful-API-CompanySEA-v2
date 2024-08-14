const express = require('express')
const router = express.Router() 
const internmembercontroller = require("../controllers/internmemberController")
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.route('/')
    .get(internmembercontroller.getAllintern_member)
    .post(upload.fields([{ name: 'image', maxCount: 1 }]), internmembercontroller.postintern_member)
    .delete(internmembercontroller.deleteintern_member)

router.route('/:id')
    .get(internmembercontroller.getintern_memberbyID)
    .delete(internmembercontroller.deleteintern_memberbyID)
    .put(upload.fields([{ name: 'image', maxCount: 1 }]), internmembercontroller.putintern_member)



module.exports = router