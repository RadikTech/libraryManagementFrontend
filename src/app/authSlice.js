import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userLogin: false,
    userId: localStorage.getItem("userId") || null,
    token: localStorage.getItem("token") || null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        register: (state, action) => {
            state.userLogin = true;

            var userId = action.payload.userId;
            state.userId = userId;
            localStorage.setItem("userId", userId);

            var token = action.payload.token;
            state.token = token;
            localStorage.setItem("token", token);
        },
        login: (state, action) => {
            state.userLogin = true;

            var userId = action.payload.userId;
            state.userId = userId;
            localStorage.setItem("userId", userId);

            var token = action.payload.token;
            state.token = token;
            localStorage.setItem("token", token);
        },
        logout: (state) => {
            state.userLogin = false;
            state.userId = null;
            state.token = null;

            localStorage.removeItem("token");
            localStorage.removeItem("userId");

        },
    }
})

export const { login, signup, logout } = authSlice.actions;

export default authSlice.reducer;