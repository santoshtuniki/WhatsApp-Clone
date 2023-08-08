// module imports
import createHttpError from 'http-errors';

// component imports
import logger from '../configs/logger.config.js';
import { doesConversationExist, createConversation, populateConversation, getUserConversations } from '../services/conversation.service.js';
import { findUser } from '../services/user.service.js';

// named exports
export const create_open_conversation = async (req, res, next) => {
    try {
        const sender_id = req.user.userId;
        const { receiver_id } = req.body;

        // check if receiver_id exists
        if (!receiver_id) {
            logger.error('Please provide the user id you wanna start a conversation with!');
            throw createHttpError.BadGateway('Oops... Something went wrong!');
        }

        // check if chat exists
        const existed_conversation = await doesConversationExist(sender_id, receiver_id);

        if (existed_conversation) {
            // response
            res.json(existed_conversation);
        } else {
            const receiver_user = await findUser(receiver_id);

            const conversationData = {
                name: receiver_user.name,
                isGroup: false,
                users: [sender_id, receiver_id],
            };

            const newConversation = await createConversation(conversationData);

            const populatedConversation = await populateConversation(newConversation._id, 'users', '-password');

            // response
            res.status(200).json(populatedConversation);
        }

    } catch (error) {
        next(error)
    }
}

export const getConversations = async (req, res, next) => {

    try {

        const user_id = req.user.userId;

        const conversations = await getUserConversations(user_id);

        // response
        res.status(200).json(conversations);

    } catch (error) {

    }
}