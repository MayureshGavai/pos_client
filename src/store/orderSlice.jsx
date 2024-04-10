import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
});

const initialState = {
    data: [],
    status: STATUSES.IDLE
}

export const postOrder = createAsyncThunk('post/order',async (orderData,thunkAPI) => {
    try{
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/orders/postorder`,orderData)
        return response.data
    }catch(err){
        throw new Error('Not able to make order',err);
    }
})

export const getOrders = createAsyncThunk('get/orders',async () => {
    try{
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/orders/getorders`)
        return res.data;
    }catch(err){
        throw new Error('Failed to fetch order',err);
    }
})



const orderSlice = createSlice({
    name:'orders',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(postOrder.pending,(state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(postOrder.fulfilled,(state, action) => {
            state.data.push(action.payload);
            state.status = STATUSES.IDLE;
        })
        .addCase(postOrder.rejected,(state, action) => {
            state.status = STATUSES.ERROR;
        })
        .addCase(getOrders.pending,(state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(getOrders.fulfilled,(state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE;
        })
        .addCase(getOrders.rejected,(state, action) => {
            state.status = STATUSES.ERROR;
        })
    }
})

export default orderSlice.reducer