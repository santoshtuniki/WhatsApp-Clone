// module imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// component imports
import { getService, postService } from '../services/chatSlice.Service';

// initial state
const initialState = {
    status: '',
    error: '',
    conversations: [],
    activeConversation: {},
    messages: [],
    notifications: [],
    files: [],
}

// env variables
const { REACT_APP_API_ENDPOINT } = process.env;

// endPoints
const CONVERSATION_ENDPOINT = `${REACT_APP_API_ENDPOINT}/conversation`;
const MESSAGE_ENDPOINT = `${REACT_APP_API_ENDPOINT}/message`;

// functions
export const getConversations = createAsyncThunk('conversation/all', async (token, { rejectWithValue }) => {
    const response = await getService(CONVERSATION_ENDPOINT, token, rejectWithValue);
    return response;
})

export const open_create_conversation = createAsyncThunk('conversation/open_create', async (values, { rejectWithValue }) => {
    const { token, receiver_id } = values;
    const response = await postService(CONVERSATION_ENDPOINT, { receiver_id }, token, rejectWithValue);
    return response;
})

export const getConversationMessages = createAsyncThunk('conversation/messages', async (values, { rejectWithValue }) => {
    const { token, conversation_id } = values;
    const response = await getService(`${MESSAGE_ENDPOINT}/${conversation_id}`, token, rejectWithValue);
    return response;
})

export const sendMessage = createAsyncThunk('message/send', async (values, { rejectWithValue }) => {
    const { token, message, conversation_id, files } = values;
    const response = await postService(MESSAGE_ENDPOINT, { message, conversation_id, files }, token, rejectWithValue);
    return response;
})

// chatSlice
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setActiveConversation: (state, action) => {
            state.activeConversation = action.payload;
        },
        updateMessagesAndConversations: (state, action) => {
            // update messages
            const convo = state.activeConversation;
            if (convo._id === action.payload.conversation._id) {
                state.messages = [...state.messages, action.payload];
            }

            // update conversations
            const conversation = {
                ...action.payload.conversation,
                latestMessage: action.payload
            }
            const newConversations = [...state.conversations].filter((convo) => convo._id !== conversation._id);
            newConversations.unshift(conversation);

            state.conversations = newConversations;
        },
        addFiles: (state, action) => {
            state.files = [...state.files, action.payload];
        },
        clearFiles: (state) => {
            state.files = [];
        },
        removeFileFromFiles: (state, action) => {
            const index = action.payload;
            const files = [...state.files];
            const fileToRemove = [files[index]];
            state.files = files.filter((file) => !fileToRemove.includes(file));
        },
    },
    extraReducers: (builder) => {
        // getConversations
        builder.addCase(getConversations.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getConversations.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.conversations = action.payload;
        })
        builder.addCase(getConversations.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
        // open_create_conversation
        builder.addCase(open_create_conversation.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(open_create_conversation.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.activeConversation = action.payload;
            state.files = [];
        })
        builder.addCase(open_create_conversation.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
        // getConversationMessages
        builder.addCase(getConversationMessages.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(getConversationMessages.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.messages = action.payload;
        })
        builder.addCase(getConversationMessages.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
        // sendMessage
        builder.addCase(sendMessage.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.messages = [...state.messages, action.payload];

            const conversation = {
                ...action.payload.conversation,
                latestMessage: action.payload
            };
            const newConversations = [...state.conversations].filter((convo) => convo._id !== conversation._id);
            newConversations.unshift(conversation);

            state.conversations = newConversations;
        })
        builder.addCase(sendMessage.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        })
    }
})

// named exports
export const {
    setActiveConversation,
    updateMessagesAndConversations,
    addFiles,
    clearFiles,
    removeFileFromFiles,
} = chatSlice.actions;

// Default exports
export default chatSlice.reducer;