// module imports
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const messageSchema = new mongoose.Schema({
    sender: {
        type: ObjectId,
        ref: 'UserModel',
    },
    message: {
        type: String,
        trim: true,
    },
    conversation: {
        type: ObjectId,
        ref: 'ConversationModel',
    },
    files: [],
},
    {
        collection: 'messages',
        timestamps: true
    },
);

// message model
const MessageModel = mongoose.models.MessageModel || mongoose.model('MessageModel', messageSchema);

// Default export
export default MessageModel;