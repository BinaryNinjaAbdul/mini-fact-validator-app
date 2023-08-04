import express from 'express';
import {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getAllCategories).post(protect, isAdmin, createCategory);

router
  .route('/:id')
  .get(getCategory)
  .patch(protect, isAdmin, updateCategory)
  .delete(protect, isAdmin, deleteCategory);

export default router;

/***
 * Technology
 * science
 * finance
 * entertainment
 * health
 * history
 */
