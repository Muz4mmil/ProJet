import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {
    user: {}
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialStateValue,
    reducers: {
        login: (state, action) => {
            state.user.value = action.payload;
        },
        logout: (state) => {
            state.user.value = initialStateValue;
        },
    },
});

export const { login, logout } = userSlice.actions;

export default  userSlice.reducer;
