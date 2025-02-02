import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const STATUSES = Object.freeze({
    IDLE : 'idle',
    ERROR : 'error',
    LOADING : 'loading'
})

const initialState = {
    data : [],
    status : STATUSES.IDLE
}

export const getTodaySalesData = createAsyncThunk('get/todaySalesData', async () => {
    try{
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/reports/get-today-sales`)
        return res.data
    }catch(err){
        throw new Error('Failed to fetch sales data', err)
    }
})

export const getDateSalesData = createAsyncThunk('get/dateSalesData', async(selectedDatesData, { rejectWithValue }) => {
    try{
        // console.log(selectedDatesData)
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/reports/get-date-sales`, selectedDatesData)
        return res.data
    }catch(err){
        return rejectWithValue(err.response.data)
    }
})

export const downloadTodaySalesReport = createAsyncThunk('get/todaySalesReport', async (_, { rejectWithValue }) => {
    try {
        const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/reports/get-today-sales-report`,
            {}, // Empty body since no data needs to be sent
            { responseType: 'blob' } // Properly placed responseType
        );
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data || "Error downloading report");
    }
})

export const downloadDateSalesReport = createAsyncThunk('get/dateSalesReport', async(selectedDatesData, {rejectWithValue}) => {
    try{
        const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/reports/get-date-sales-report`, 
            selectedDatesData,
            {responseType : 'blob'}
        )
        return res.data
    }catch(err){
        return  rejectWithValue(err.response?.data || "Error downloading report")
    }
})


const reportSlice = createSlice({
    name : 'reports',
    initialState,
    reducers:{},
    extraReducers : (builder) => {
        builder
        .addCase(getTodaySalesData.pending,(state, action) => {
            state.status = STATUSES.LOADING
        })
        .addCase(getTodaySalesData.fulfilled, (state,action) => {
            state.data = action.payload
            state.status = STATUSES.IDLE
        })
        .addCase(getTodaySalesData.rejected, (state, action) => {
            state.status = STATUSES.ERROR
        })
        .addCase(getDateSalesData.pending,(state, action) => {
            state.status = STATUSES.LOADING
        })
        .addCase(getDateSalesData.fulfilled, (state,action) => {
            state.data = action.payload
            state.status = STATUSES.IDLE
        })
        .addCase(getDateSalesData.rejected, (state, action) => {
            state.status = STATUSES.ERROR
        })
        .addCase(downloadDateSalesReport.pending,(state) => {
            state.status = STATUSES.LOADING
        })
        .addCase(downloadDateSalesReport.fulfilled, (state) => {
            state.status = STATUSES.IDLE
        })
        .addCase(downloadDateSalesReport.rejected, (state, action) => {
            state.data = action.payload
            state.status = STATUSES.ERROR
        })
        .addCase(downloadTodaySalesReport.pending, (state) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(downloadTodaySalesReport.fulfilled, (state) => {
            state.status = STATUSES.IDLE;
        })
        .addCase(downloadTodaySalesReport.rejected, (state, action) => {
            state.status = STATUSES.ERROR;
            state.error = action.payload;
        });
    }
})


export default reportSlice.reducer