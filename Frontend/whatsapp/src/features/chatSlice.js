// module imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// initial state
const initialState = {
    status: '',
    error: '',
    conversations: [],
    activeConversation: {},
    notifications: [],
}

// env variables
const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`;

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

// chatSlice
const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setActiveConversation: (state, action) => {
            state.activeConversation = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getConversations.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(getConversations.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.conversations = action.payload
            state.error = ''
        })
        builder.addCase(getConversations.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        })
        builder.addCase(open_create_conversation.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(open_create_conversation.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.activeConversation = action.payload
            state.error = ''
        })
        builder.addCase(open_create_conversation.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        })
    }
})

// named exports
export const { setActiveConversation } = chatSlice.actions;

// Default exports
export default chatSlice.reducer;