// module imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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
    try {
        const { data } = await axios.get(CONVERSATION_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data.error.message);
    }
})

export const open_create_conversation = createAsyncThunk('conversation/open_create', async (values, { rejectWithValue }) => {
    const { token, receiver_id } = values;
    try {
        const { data } = await axios.post(CONVERSATION_ENDPOINT, { receiver_id }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data.error.message);
    }
})

export const getConversationMessages = createAsyncThunk('conversation/messages', async (values, { rejectWithValue }) => {
    const { token, conversation_id } = values;
    try {
        const { data } = await axios.get(`${MESSAGE_ENDPOINT}/${conversation_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data.error.message);
    }
})

export const sendMessage = createAsyncThunk('message/send', async (values, { rejectWithValue }) => {
    const { token, message, conversation_id, files } = values;
    try {
        const { data } = await axios.post(
            MESSAGE_ENDPOINT,
            {
                message,
                conversation_id,
                files
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data.error.message);
    }
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
} = chatSlice.actions;

// Default exports
export default chatSlice.reducer;