// module imports
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

// conversation Schema
const conversationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Conversation is required.'],
        trim: true,
    },
    isGroup: {
        type: Boolean,
        required: true,
        default: false,
    },
    users: [
        {
            type: ObjectId,
            ref: 'UserModel'
        },
    ],
    latestMessage: {
        type: ObjectId,
        ref: 'MessageModel'
    },
    admin: {
        type: ObjectId,
        ref: 'UserModel'
    },
},
    {
        collection: 'conversations',
        timestamps: true
    }
)


// Conversation Model
const ConversationModel = mongoose.models.ConversationModel || mongoose.model('ConversationModel', conversationSchema);

// Default export
export default ConversationModel;