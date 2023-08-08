// module imports
import express from 'express';
import trimRequest from 'trim-request';

// component imports
import { create_open_conversation } from '../controllers/conversation.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

// router
const conversationRouter = express.Router();

// register route
conversationRouter.route('/').post(trimRequest.all, authMiddleware, create_open_conversation);

// Default export
export default conversationRouter;