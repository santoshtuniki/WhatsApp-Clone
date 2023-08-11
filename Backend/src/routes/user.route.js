// module imports
import express from 'express';
import trimRequest from 'trim-request';

// component imports
import { searchUsers } from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

// router
const userRouter = express.Router();

userRouter.route('/').get(trimRequest.all, authMiddleware, searchUsers);

// Default export
export default userRouter;