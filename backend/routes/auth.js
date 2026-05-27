import { Router } from 'express';
import { login, logout, checkAuth } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.post('/login', login);
router.post('/logout', protect, logout);
router.get('/me', protect, checkAuth);

export default router;
