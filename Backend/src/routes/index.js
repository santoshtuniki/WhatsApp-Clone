// module imports
import express from 'express';

// component imports
import authRoutes from './auth.route.js';

// router
const router = express.Router();

// use routes
router.use('/auth', authRoutes);

// Default export
export default router;