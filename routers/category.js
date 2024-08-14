const express = require('express')
const router = express.Router()
const categorycontroller = require("../controllers/categoryController")

router.route('/')
    .get(categorycontroller.getAllcategory)
    .post(categorycontroller.postCategory)
    .delete(categorycontroller.deleteCategory)

router.route('/:id')
    .put(categorycontroller.putCategory)
    .get(categorycontroller.getCategorybyID)
    .delete(categorycontroller.deleteCategorybyID)

module.exports = router