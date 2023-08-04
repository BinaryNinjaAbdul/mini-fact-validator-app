import express from 'express';
import {
  getAllFacts,
  createFact,
  deleteFact,
  updatedFact,
  likeToggle,
  getFactsByCategory,
  getFactsById,
  dislikeToggle,
} from '../controllers/factController.js';

import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getAllFacts).post(protect, createFact);

router
  .route('/:id')
  .get(getFactsByCategory)
  .put(protect, updatedFact)
  .patch(protect, likeToggle)
  .delete(protect, deleteFact);

router.route('/:category/:id').get(getFactsById);
router.route('/dislike/:id').patch(protect, dislikeToggle);

export default router;
