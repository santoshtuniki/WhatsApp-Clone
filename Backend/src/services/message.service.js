// module imports
import createHttpError from 'http-errors';

// component imports
import { MessageModel } from '../models/index.js';

// named exports
export const createMessage = async (data) => {
    // create message
    const newMessage = await MessageModel.create(data);

    // check newMessage
    if (!newMessage)
        throw createHttpError.BadRequest('Oops... Something went wrong');

    // return
    return newMessage;
}

export const populateMessage = async (id) => {
    // find message
    const message = await MessageModel.findById(id)
        .populate({
            path: 'sender',
            select: 'name picture',
            model: 'UserModel',
        })
        .populate({
            path: 'conversation',
            select: 'name picture isGroup users',
            model: 'ConversationModel',
            populate: {
                path: 'users',
                select: 'name email picture status',
                model: 'UserModel',
            },
        });

    // check message
    if (!message)
        throw createHttpError.BadRequest('Oops... Something went wrong');

    // return
    return message;

}

export const getConversationMessages = async (conversation) => {
    // find messages
    const messages = await MessageModel.find({ conversation })
        .populate('sender', 'name email picture status')
        .populate('conversation');

    // check message
    if (!messages)
        throw createHttpError.BadRequest('Oops... Something went wrong');

    // return
    return messages;

}