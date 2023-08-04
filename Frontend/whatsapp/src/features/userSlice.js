// module imports
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: '',
    error: '',
    user: {
        id: '',
        name: 'sai',
        email: '',
        picture: '',
        status: '',
        token: ''
    }
}

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
    }
});

// Named export
export const { logout } = userSlice.actions;

// Default export
export default userSlice.reducer;