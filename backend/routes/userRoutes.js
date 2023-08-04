import express from 'express';
import {
  authUser,
  resgisterUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(resgisterUser);
router.route('/auth').post(authUser);
router.route('/logout').post(logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .patch(protect, updateUserProfile);

export default router;
