// module imports
import express from 'express';

// component imports
import authRoutes from './auth.route.js';
import conversationRoutes from './conversation.route.js';
import messageRoutes from './message.route.js';
import userRoutes from './user.route.js';

// router
const router = express.Router();

// use routes
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/conversation', conversationRoutes);
router.use('/message', messageRoutes);

// Default export
export default router;