import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    alerts: [],
};

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        showAlert: (state, action) => {
            const {
                payload: {
                    message,
                    type = 'info',
                } = {},
            } = action;

            state.alerts.push({ id: nanoid(), message, type});
        },
        clearAlert: (state, action) => {
            state.alerts = state.alerts.filter((alert) => alert.id !== action.payload);
        },
    },
});

export const { showAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;
