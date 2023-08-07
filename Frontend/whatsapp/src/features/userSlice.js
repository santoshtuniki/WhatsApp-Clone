// module imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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
    }
}

// env variables
const AUTH_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/auth`;

export const registerUser = createAsyncThunk('auth/register', async (values, { rejectWithValue }) => {
    try {
        const { data } = axios.post(`${AUTH_ENDPOINT}/register`, { ...values });
        return data;
    } catch (err) {
        return rejectWithValue(err.response.data.error.message);
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.status = '';
            state.error = '';
            state.user = {
                id: '',
                name: '',
                email: '',
                picture: '',
                status: '',
                token: ''
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.status = 'loading'
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.status = 'succeeded'
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.status = 'loading'
        })
    }
});

// Named export
export const { logout } = userSlice.actions;

// Default export
export default userSlice.reducer;