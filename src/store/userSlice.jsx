import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
});

const persistedState = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')): {};



export const registerUser = createAsyncThunk('user/register', async (userData, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users/register`, userData);
        return res.data; // Assuming the response contains user data
    } catch (err) {
        return rejectWithValue(err.response.data); // Pass error data to the reducer
    }
});

export const loginUser = createAsyncThunk('user/login', async (userData, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users/login`, userData);
        localStorage.setItem('user',JSON.stringify(res.data.user))
        return res.data; // Assuming the response contains user data
    } catch (err) {
        return rejectWithValue(err.response.data); // Pass error data to the reducer
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState : persistedState,
    reducers: {
        logOutUser: (state) => {
            state.user = null;
            localStorage.removeItem('user')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.user = action.payload; // Assuming the response contains user data directly
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
            .addCase(loginUser.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.user = action.payload; // Assuming the response contains user data directly
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    }
});

export const { logOutUser } = userSlice.actions;

export default userSlice.reducer;
