import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR : 'error',
    LOADING : 'loading'
})

const itemsSlice = createSlice({
    name:'items',
    initialState : {
        data : [],
        status : STATUSES.IDLE
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchItems.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchItems.fulfilled, (state, action) => {
            state.data = action.payload;
            state.status = STATUSES.IDLE;
        })
        .addCase(fetchItems.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
        });
    }
})

// Thunk
export const fetchItems = createAsyncThunk('items/fetch',async ()=>{
    const res = await fetch('http://localhost:8080/api/items/getitems')
    const data = res.json()
    return data
})


export default itemsSlice.reducer