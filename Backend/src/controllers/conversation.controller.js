// module imports
import createHttpError from 'http-errors';

// component imports
import logger from '../configs/logger.config.js';
import { doesConversationExist, createConversation, populateConversation, getUserConversations } from '../services/conversation.service.js';
// import { findUser } from '../services/user.service.js';

// env variable
const { DEFAULT_GROUP_PICTURE } = process.env;

// named exports
export const create_open_conversation = async (req, res, next) => {

    try {
        const sender_id = req.user.userId;
        const { receiver_id, isGroup } = req.body;

        // if not a GroupChat
        if (isGroup == false) {
            // check if receiver_id exists
            if (!receiver_id) {
                logger.error('Please provide the user id you wanna start a conversation with!');
                throw createHttpError.BadGateway('Oops... Something went wrong!');
            }

            // check if chat exists
            const existed_conversation = await doesConversationExist(sender_id, receiver_id, false);

            if (existed_conversation) {
                // response
                res.json(existed_conversation);
            } else {
                // const receiver_user = await findUser(receiver_id);
                const conversationData = {
                    name: 'conversation name',
                    picture: 'conversation picture',
                    isGroup: false,
                    users: [sender_id, receiver_id],
                };

                const newConversation = await createConversation(conversationData);

                const populatedConversation = await populateConversation(newConversation._id, 'users', '-password');

                // response
                res.status(200).json(populatedConversation);
            }
        } else {
            const existed_group_conversation = await doesConversationExist('', '', isGroup);

            // response
            res.status(200).json(existed_group_conversation);
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
        next(error)
    }
}

export const createGroup = async (req, res, next) => {

    const { name, users } = req.body;

    // add current user to users ( myself )
    users.push(req.user.userId);

    if (!name || !users) {
        throw createHttpError.BadRequest('Please fill all fields.');
    }

    if (users.length < 2) {
        throw createHttpError.BadRequest(
            'Atleast 2 users are required to start a group chat.'
        );
    }

    let data = {
        name,
        users,
        isGroup: true,
        admin: req.user.userId,
        picture: DEFAULT_GROUP_PICTURE,
    };

    try {
        const newConversation = await createConversation(data);

        const populatedConvo = await populateConversation(
            newConversation._id,
            'users admin',
            '-password'
        );

        // response
        res.status(200).json(populatedConvo);

    } catch (error) {
        next(error);
    }
};