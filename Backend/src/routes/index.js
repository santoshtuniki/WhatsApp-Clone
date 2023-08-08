// module imports
import express from 'express';

// component imports
import authRoutes from './auth.route.js';
import conversationRouter from './conversation.route.js';

// router
const router = express.Router();

// use routes
router.use('/auth', authRoutes);
router.use('/conversation', conversationRouter);

// Default export
export default router;