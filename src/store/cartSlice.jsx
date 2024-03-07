// import { createSlice } from "@reduxjs/toolkit";

// // const persistedState = localStorage.getItem('posCart') ? JSON.parse(localStorage.getItem('posCart')) : []
// const persistedState = localStorage.getItem('posCart') ? JSON.parse(localStorage.getItem('posCart')) : [];

// const cartSlice = createSlice({
//   name:'cart',
//   initialState : persistedState,
//   reducers : {
//     // add(state,action){
//       // const { id } = action.payload;
//       // const existingProductIndex = state.findIndex(item => item.id === id);
//       // let newState;
//       // if (existingProductIndex !== -1) {
//       //   newState = state.map((item, index) =>
//       //     index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
//       //   );
//       // } else {
//       //   newState = [...state, { ...action.payload, quantity: 1 }];
//       // }
//       // localStorage.setItem('posCart', JSON.stringify(newState));
//       // return newState;
      
//     // },
//     add(state, action) {
//       const { id } = action.payload;
//       const existingItemIndex = state.findIndex(item => item.id === id);
//       if (existingItemIndex !== -1) {
//         // If the item exists in the cart, create a new state array with the quantity updated
//         return state.map((item, index) =>
//           index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       } else {
//         // If the item doesn't exist in the cart, add it with quantity 1
//         const newItem = { ...action.payload, quantity: 1 };
//         const newState = [...state, newItem];
//         localStorage.setItem('posCart', JSON.stringify(newState));
//         return newState;
//       }
//     },
    
//     remove(state,action){
//       const newState = state.filter((item) => item.id !== action.payload)
//       localStorage.setItem('posCart',JSON.stringify(newState))
//       return newState
//     },
//     increment(state,action){
//       const { id } = action.payload;
//       const newState = state.map(item =>
//         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//       );
//       localStorage.setItem('posCart', JSON.stringify(newState));
//       return newState;
//     },
//     decrement(state,action){
//       const {id} = action.payload
//       const existingProductIndex = state.findIndex(item => item.id === id)
//       if(existingProductIndex !== -1){
//         const existingProduct = state[existingProductIndex]
//         if(existingProduct.quantity > 1){
//           existingProduct.quantity -= 1
//           localStorage.setItem('posCart',JSON.stringify(state))
//         }else{
//           state.splice(existingProductIndex,1)
//           localStorage.setItem('posCart',JSON.stringify(state))
//         }
//       }
//     },
//     clearCart(state,action){
//       localStorage.removeItem('posCart')
//       return []
//     }

//   }
// })

// export const {add,remove,increment,decrement,clearCart} = cartSlice.actions
// export default cartSlice.reducer

import { createSlice } from "@reduxjs/toolkit";

const persistedState = localStorage.getItem('posCart') ? JSON.parse(localStorage.getItem('posCart')) : [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: persistedState,
  reducers: {
    add(state, action) {
      // const { id } = action.payload;
      // console.log(action.payload)
      // const existingItem = state.find(item => item.id === id);
      // let newState;
      // if (existingItem) {
      //   newState = state.map(item =>
      //     item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      //   );
      // } else {
      //   newState = [...state, { ...action.payload, quantity: 1 }];
      // }
      // localStorage.setItem('posCart', JSON.stringify(newState));
      // return newState;

      console.log("Add reducer invoked with payload:", action.payload);
      const newItem = action.payload;
      const existingItemIndex = state.findIndex(item => item.id === newItem.id);
    
      if (existingItemIndex !== -1) {
        // If the item already exists in the cart, create a new state array
        // and update the quantity of the existing item
        const newState = state.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
        localStorage.setItem('posCart', JSON.stringify(newState));
        return newState;
      } else {
        // If the item doesn't exist in the cart, add it as a new entry
        const newState = [...state, { ...newItem, quantity: 1 }];
        localStorage.setItem('posCart', JSON.stringify([...state, { ...newItem, quantity: 1 }]));
        return [...state, { ...newItem, quantity: 1 }];
      }
        
    },
    remove(state, action) {
      const newState = state.filter(item => item.id !== action.payload);
      localStorage.setItem('posCart', JSON.stringify(newState));
      return newState;
    },
    increment(state, action) {
      const { id } = action.payload;
      const newState = state.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem('posCart', JSON.stringify(newState));
      return newState;
    },
    decrement(state, action) {
      const { id } = action.payload;
      const newState = state.map(item =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
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
