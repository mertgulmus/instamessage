import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state, action) => {
            state.user = null;
        },
        getUser: (state, action) => {
            return state.user;
        },
    },
});

export const { setUser, logout, getUser } = userSlice.actions;

export default userSlice.reducer;
