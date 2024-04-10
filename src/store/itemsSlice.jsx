import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading'
});

const initialState = {
    data: [],
    status: STATUSES.IDLE
}

// Fetch Items Thunk
export const fetchItems = createAsyncThunk('items/fetch', async () => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/items/getitems`);
        const data = await res.json(); // Await the JSON parsing
        return data;
    } catch (err) {
        throw new Error('Failed to fetch items'); // Throw an error to be caught by .rejected case
    }
});

// Add New Item Thunk
export const addNewItem = createAsyncThunk('items/post', async (itemData, thunkAPI) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/items/postitems`, itemData);
        return response.data;
    } catch (err) {
        throw new Error('Failed to add new item');
    }
});

// Update Item Thunk
export const updateItem = createAsyncThunk(
    'items/updateItem',
    async (data, thunkAPI) => {
      try {
        const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/items/${data._id}`, data);
        return response.data;
      } catch (error) {
        throw new Error('Failed to update item');
      }
    }
  );
// Delete Item Thunk
export const deleteItem = createAsyncThunk(
    'items/deleteItem',
    async (itemId, thunkAPI) => {
      try {
        // Send a DELETE request to the server
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/items/${itemId}`);
        // Return the itemId to be used by the reducer
        return itemId;
      } catch (error) {
        // If an error occurs, throw it to be caught by the error handler
        throw new Error('Failed to delete item');
      }
    }
  );

export const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
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
            })
            .addCase(addNewItem.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(addNewItem.fulfilled, (state, action) => {
                state.data.push(action.payload);
                state.status = STATUSES.IDLE;
            })
            .addCase(addNewItem.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
            .addCase(updateItem.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                // Update the item in the state data
                const updatedItem = action.payload;
                state.data = state.data.map(item => {
                    if (item._id === updatedItem._id) {
                        return updatedItem;
                    }
                    return item;
                });
                state.status = STATUSES.IDLE;
            })
            .addCase(updateItem.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            })
            .addCase(deleteItem.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                // Remove the item from the state data
                const deletedItemId = action.payload;
                state.data = state.data.filter(item => item._id !== deletedItemId);
                state.status = STATUSES.IDLE;
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    }
});

// Export the slice reducer
export const { reducer: itemsReducer } = itemsSlice;
