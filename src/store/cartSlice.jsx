import { createSlice } from "@reduxjs/toolkit";

const persistedState = localStorage.getItem('posCart') ? JSON.parse(localStorage.getItem('posCart')) : [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: persistedState,
  reducers: {
    add(state, action) {
      const newItem = action.payload;
      const existingItemIndex = state.findIndex(item => item._id === newItem._id);
    
      if (existingItemIndex !== -1) {
        const newState = state.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
        localStorage.setItem('posCart', JSON.stringify(newState));
        return newState;
      } else {
        const newState = [...state, { ...newItem, quantity: 1 }];
        localStorage.setItem('posCart', JSON.stringify(newState));
        return newState;
      }
        
    },
    remove(state, action) {
      const newState = state.filter(item => item._id !== action.payload);
      localStorage.setItem('posCart', JSON.stringify(newState));
      return newState;
    },
    increment(state, action) {
      const { _id } = action.payload;
      const newState = state.map(item =>
        item._id === _id ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem('posCart', JSON.stringify(newState));
      return newState;
    },
    decrement(state, action) {
      const { _id } = action.payload;
      const newState = state.map(item =>
        item._id === _id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      );
      localStorage.setItem('posCart', JSON.stringify(newState));
      return newState;
    },
    clearCart(state, action) {
      localStorage.removeItem('posCart');
      return [];
    }
  }
});

export const { add, remove, increment, decrement, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
