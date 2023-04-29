import { createSlice } from '@reduxjs/toolkit'
import { collection, getDoc, getDocs, addDoc,updateDoc, deleteDoc, doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from 'react';

const initialState = {
  products: []
}

//get uid
const userObj = JSON.parse(localStorage.getItem('userClient'));
const uid = userObj ? userObj.uid : null;

console.log(uid); // "sDv3mSKhxwbBN1zvkTjehC9rV993"

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    addToCart: (state, action) => {
      console.log(uid); // "sDv3mSKhxwbBN1zvkTjehC9rV993"


      if (uid) {
        const item = state.products.find(item => item.id === action.payload.id);

        if (item) {
          item.quantity += action.payload.quantity;
        } else {
          state.products.push(action.payload);
        }

        // // update cart in Firestore
        // const collectionRef = collection(db, "carts");
        // const docRef = doc(collectionRef, uid);
        // const cartData = item;

        // addDoc(docRef, {
        //   ...cartData,
        //   timeStamp: serverTimestamp(),
        // }).catch((error) => {
        //   console.error(error);
        // });
        // console.error(cartData);
      } else {
        console.log("Please log in first!")
        window.alert("Please log in first!"); // show alert if uid is null
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


// Action creators are generated for each case reducer function
export const { addToCart, removeItem, resetCart } = cartSlice.actions

export default cartSlice.reducer