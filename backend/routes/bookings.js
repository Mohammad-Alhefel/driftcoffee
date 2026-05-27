import { Router } from 'express';
import {
  createBooking,
  getAllBookings,
  getBooking,
  updateBookingStatus,
  deleteBooking,
  getStats,
} from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/', createBooking);

router.get('/stats', protect, getStats);
router.get('/', protect, getAllBookings);
router.get('/:id', protect, getBooking);
router.patch('/:id', protect, updateBookingStatus);
router.delete('/:id', protect, deleteBooking);

export default router;
