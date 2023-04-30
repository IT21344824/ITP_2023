import { createSlice } from '@reduxjs/toolkit';
import { collection, doc, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useState , useContext } from 'react';
import { AuthContext } from "../context/AuthContext";

const initialState = {
  products: []
}


const userObj = JSON.parse(localStorage.getItem('userClient'));
const uid = userObj ? userObj.uid : null;

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
    //  const { currentUser } = useContext(AuthContext)

      if (uid) {
        const item = state.products.find(item => item.id === action.payload.id);

        if (item) {
          item.quantity += action.payload.quantity;
        } else {
          state.products.push(action.payload);
        }       

      } else {
        console.log("Please log in first!")
        //window.alert("Please log in first!"); // show alert if uid is null
        
      }
    },
    removeItem: (state, action) => {
      state.products = state.products.filter(item => item.id !== action.payload)
    },
    resetCart: (state) => {
      state.products = []
    },
  },
})

export const { addToCart, removeItem, resetCart } = cartSlice.actions

export default cartSlice.reducer;
