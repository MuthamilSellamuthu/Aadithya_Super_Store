import express from 'express';
import { getCart, addToCart, removeFromCart, clearCart } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getCart)
  .delete(protect, clearCart);

router.post('/add', protect, addToCart);
router.delete('/:productId', protect, removeFromCart);

export default router;
