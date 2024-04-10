import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { itemsApi } from "./itemsApi";
import { itemsReducer } from "./itemsSlice";
import cartSlice from "./cartSlice";
import userSlice from "./userSlice";
import orderSlice from "./orderSlice";


export const store = configureStore({
    reducer:{
        cart: cartSlice,
        items: itemsReducer,
        user : userSlice,
        orders : orderSlice,
        [itemsApi.reducerPath] : itemsApi.reducer
    },

    middleware:(getDefaultMiddleware) =>{
       return getDefaultMiddleware().concat(itemsApi.middleware)
    }
})

setupListeners(store.dispatch)