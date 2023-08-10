// module imports
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createFilter from 'redux-persist-transform-filter';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// component imports
import userReducer from '../features/userSlice';
import chatReducer from '../features/chatSlice';

// combine reducer
const rootReducer = combineReducers({
    user: userReducer,
    chat: chatReducer,
});

// saveUserOnlyFilter
const saveUserOnlyFilter = createFilter('user', ['user']);

// persist config
const persistConfig = {
    key: 'user',
    storage,
    whitelist: ['user'],    // key in rootReducer when using combineReducers
    transforms: [saveUserOnlyFilter]
};

// persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
    devTools: true
});

// persist store
export const persistor = persistStore(store);