// module imports
import express from 'express';
import trimRequest from 'trim-request';

// component imports
import { create_open_conversation, getConversations } from '../controllers/conversation.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

// router
const conversationRouter = express.Router();

conversationRouter.route('/').post(trimRequest.all, authMiddleware, create_open_conversation);

conversationRouter.route('/').get(trimRequest.all, authMiddleware, getConversations);

// Default export
export default conversationRouter;