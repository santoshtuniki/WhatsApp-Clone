// module imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// component imports
import { postService } from '../services/userSlice.Service';

// initial state
const initialState = {
    status: '',
    error: '',
    user: {
        id: '',
        name: '',
        email: '',
        picture: '',
        status: '',
        token: ''
    },
}

// env variables
const { REACT_APP_API_ENDPOINT } = process.env;

// endPoints
const AUTH_ENDPOINT = `${REACT_APP_API_ENDPOINT}/auth`;

// functions
export const registerUser = createAsyncThunk('auth/register', async (values, { rejectWithValue }) => {
    const response = await postService(`${AUTH_ENDPOINT}/register`, { ...values }, rejectWithValue);
    return response;
})

export const loginUser = createAsyncThunk('auth/login', async (values, { rejectWithValue }) => {
    const response = await postService(`${AUTH_ENDPOINT}/login`, { ...values }, rejectWithValue);
    return response;
})

// userSlice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.status = ''
            state.error = ''
            state.user = {
                id: '',
                name: '',
                email: '',
                picture: '',
                status: '',
                token: ''
            }
        },
        changeStatus: (state, action) => {
            state.status = action.payload
        }
    },
    extraReducers: (builder) => {
        // registerUser
        builder.addCase(registerUser.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.user = action.payload.user
            state.error = ''
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.status = 'failed'
            state.user = ''
            state.error = action.payload
        })
        // loginUser
        builder.addCase(loginUser.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.user = action.payload.user
            state.error = ''
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.status = 'failed'
            state.user = ''
            state.error = action.payload

        })
    },
});

// Named export
export const { logout, changeStatus } = userSlice.actions;

// Default export
export default userSlice.reducer;