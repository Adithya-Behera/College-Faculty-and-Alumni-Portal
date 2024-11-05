import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import facultyReducer from './facultySlice';
import alumniReducer from './alumniSlice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        faculty: facultyReducer,
        alumni:alumniReducer
    },
});

export default store;
