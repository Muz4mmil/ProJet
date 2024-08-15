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
        updateSaved: (state, action) => {
            console.log(action.payload)
            state.user.value.saved = action.payload;
        }
    },
});

export const { login, logout, updateSaved } = userSlice.actions;

export default userSlice.reducer;
