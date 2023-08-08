// module imports
import express from 'express';
import trimRequest from 'trim-request';

// component imports
import { sendMessage, getMessages } from '../controllers/message.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

// router
const messageRouter = express.Router();

messageRouter.route('/').post(trimRequest.all, authMiddleware, sendMessage);

messageRouter.route('/:conversation_id').get(trimRequest.all, authMiddleware, getMessages);

// Default export
export default messageRouter;