// module imports
import createHttpError from 'http-errors';

// component imports
import { ConversationModel, UserModel } from '../models/index.js';

// named exports
export const doesConversationExist = async (sender_id, receiver_id) => {
    let conversation = await ConversationModel.find({
        isGroup: false,
        $and: [
            { users: { $elemMatch: { $eq: sender_id } } },
            { users: { $elemMatch: { $eq: receiver_id } } }
        ]
    })
        .populate('users', '-password')
        .populate('latestMessage');

    // check if conversation exists
    if (!conversation)
        throw createHttpError.BadRequest('Oops... Something went wrong!');

    // populate message model
    conversation = await UserModel.populate(conversation, {
        path: 'latestMessage.sender',
        select: 'name email picture status',
    })

    // return
    return conversation[0];

}

export const createConversation = async (data) => {

    // create conversation
    const newConversation = await ConversationModel.create(data);

    // check if newConversation created
    if (!newConversation)
        throw createHttpError.BadRequest('Oops... Something went wrong!');

    // return
    return newConversation;

}

export const populateConversation = async (id, fieldToPopulate, fieldToRemove) => {

    // populate conversation
    const populatedConversation = await ConversationModel.findOne({ _id: id })
        .populate(fieldToPopulate, fieldToRemove);

    // check if Conversation populated
    if (!populatedConversation)
        throw createHttpError.BadRequest('Oops... Something went wrong!');

    // return
    return populateConversation;

}