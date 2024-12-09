import { configureStore } from '@reduxjs/toolkit';
import loadingSlice from "./loadingSlice"
import authSlice from './authSlice';

const authStore = configureStore({
    reducer: {
        loading: loadingSlice,
        auth: authSlice,
    }
});

export default authStore;