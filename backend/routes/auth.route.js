import express from 'express';
import { login, logout, singup, 
         verifyEmail, forgotPassword, 
         resetPassword, checkAuth} 
from '../controllers/auth.controller.js';
import { verifyToken } from "../middleware/verifyToken.js";
import { protect } from "../middleware/protect.js";
const router = express.Router();


// router.get('/check-auth', verifyToken, checkAuth);
router.get("/check-auth", protect, checkAuth);

router.post('/signup', singup);
router.post('/login', login);
router.post('/logout', logout);

router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

export default router;