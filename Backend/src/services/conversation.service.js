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

export const getUserConversations = async (user_id) => {

    let conversations;

    await ConversationModel.find({
        users: { $elemMatch: { $eq: user_id } }
    })
        .populate('users', '-password')
        .populate('admin', '-password')
        .populate('latestMessage')
        .sort({ updatedAt: -1 })
        .then(async (results) => {
            results = await UserModel.populate(results, {
                path: 'latestMessage.sender',
                select: 'name email picture status',
            });

            conversations = results
        })
        .catch((error) => {
            throw createHttpError.BadRequest('Oops... Something went wrong!');
        });

    // return
    return conversations;

}

export const updateLatestMessage = async (id, message) => {
    const updatedConversation = await ConversationModel.findByIdAndUpdate(id, {
        latestMessage: message
    });

    // check if updatedConversation exists
    if (!updatedConversation)
        throw createHttpError.BadRequest('Oops... Something went wrong!');
    
    // return 
    return updatedConversation;
}