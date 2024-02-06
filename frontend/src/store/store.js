import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './dispatchers/alertSlice';

export const store = configureStore({
    reducer: {
        alert: alertReducer,
    }
});

export default store;
