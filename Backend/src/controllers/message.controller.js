// module imports
import createHttpError from 'http-errors';

// component imports
import logger from '../configs/logger.config.js';
import { createMessage, populateMessage, getConversationMessages } from '../services/message.service.js';
import { updateLatestMessage } from '../services/conversation.service.js';

// named exports
export const sendMessage = async (req, res, next) => {

    try {
        const user_id = req.user.userId;

        const { message, conversation, files } = req.body;

        // check message and conversation
        if (!conversation || (!message && !files)) {
            logger.error('Please provide a conversation id and a message body.');
            res.sendStatus(400);
        }

        const messageData = {
            sender: user_id,
            message,
            conversation,
            files: files || [],
        }

        const newMessage = await createMessage(messageData);

        const populatedMessage = await populateMessage(newMessage._id);

        await updateLatestMessage(conversation, newMessage);

        res.json(populatedMessage);

    } catch (error) {
        next(error)
    }
}

export const getMessages = async (req, res, next) => {

    try {
        // retrieve params
        const { conversation_id } = req.params;

        // check if conversation_id exists
        if (!conversation_id) {
            logger.error('Please add a conversation id in the params.');
            res.sendStatus(400);
        }

        const messages = await getConversationMessages(conversation_id);

        // response
        res.json(messages);

    } catch (error) {
        next(error)
    }
}