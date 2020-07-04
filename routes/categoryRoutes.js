const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

router
  .route('/')
  .get(categoryController.getCategories)
  .post(categoryController.createCategory);

router
  .route('/:id')
  .get(categoryController.getCateogry)
  .patch(categoryController.updateCateogry)
  .delete(categoryController.deleteCateogry);

module.exports = router;
