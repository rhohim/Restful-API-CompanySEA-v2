const express = require('express')
const router = express.Router() 
const employeecontroller = require("../controllers/employeeeController")
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.route("/")
    .get(employeecontroller.getAllemployee)
    .post(upload.fields([{ name: 'image', maxCount: 1 }]), employeecontroller.postemployee)
    .delete(employeecontroller.deleteemployee)

router.route("/:id")
    .get(employeecontroller.getemployeebyID)
    .delete(employeecontroller.deleteemployeebyID)
    .put(upload.fields([{ name: 'image', maxCount: 1 }]), employeecontroller.putemployeebyID)


module.exports = router