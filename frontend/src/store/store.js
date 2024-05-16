import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './dispatchers/alertSlice';
import userReducer from './dispatchers/userSlice';

export const store = configureStore({
    reducer: {
        alert: alertReducer,
        user: userReducer,
    }
});

export default store;
