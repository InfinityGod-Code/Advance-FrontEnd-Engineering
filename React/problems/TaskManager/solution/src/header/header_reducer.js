import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
};

const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        },
    },
});

export const {login, logout} = headerSlice.actions;

export default headerSlice.reducer;