// module imports
import { configureStore } from '@reduxjs/toolkit';

// component imports
import userReducer from "../features/userSlice";

const store = configureStore({
    reducer: {
        user: userReducer
    },
    devTools: true
});

// Default export 
export default store;