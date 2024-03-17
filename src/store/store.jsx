import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { itemsApi } from "./itemsApi";
import { itemsReducer } from "./itemsSlice";
import cartSlice from "./cartSlice";
// import postItemSlice from "./postItemSlice";
// import cartReducer from "./cartSlice";


export const store = configureStore({
    reducer:{
        cart: cartSlice,
        items: itemsReducer,
        // postItem : postItemReducer,
        [itemsApi.reducerPath] : itemsApi.reducer
    },

    middleware:(getDefaultMiddleware) =>{
       return getDefaultMiddleware().concat(itemsApi.middleware)
    }
})

setupListeners(store.dispatch)