import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state,action) => {
        const item = state.products.find(item=> item.id === action.payload.id);

        if(item){
            item.quantity+=action.payload.quantity;
        } else {
            state.push(action.payload) ;
        }
       
     
      state.value += 1
    },
    removeItem: (state ,action ) => {
        state.products=state.products.filter(item=>item.id !== action.payload)
     // state.value -= 1
    },
    resetCart: (state, action) => {
        state.products =[]
      //state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToCart, removeItem, resetCart } = cartSlice.actions

export default cartSlice.reducer