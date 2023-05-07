import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import './Cart.scss'
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, resetCart } from '../../redux/cartReducer';
import { collection, arrayRemove, getDoc, addDoc, serverTimestamp, query, updateDoc, onSnapshot, doc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useNavigate } from 'react-router-dom';

const Cart = ({ setOpen }) => {


  //get details-------------------------------------------------------------------------------
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState('');

  const [cartDetails, setCartDetails] = useState([]);


  //get uid
  const userObj = JSON.parse(localStorage.getItem('userClient'));
  const uid = userObj ? userObj.uid : null;

  //get current user cart id
  useEffect(() => {

    const userRef = doc(db, 'Users', uid);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      const UcartId = doc.data()?.cartId;
      setCartId(UcartId);
    });

    return () => unsubscribe();
  }, [uid]);


  //get current user cart details
  useEffect(() => {
    let unsubscribeCart;

    async function getCartDetails() {
      if (cartId) {
        const cartRef = doc(db, 'cart', cartId);

        try {
          unsubscribeCart = onSnapshot(cartRef, async (doc) => {
            if (doc.exists()) {
              const data = doc.data();
              await setCartDetails(data);
              console.log(data);
            } else {
              console.log("No such document!");
            }
          });
        } catch (error) {
          console.log("Error getting document:", error);
        }
      }
    }

    getCartDetails();

    return () => {
      if (unsubscribeCart) {
        unsubscribeCart();
      }
    };
  }, [cartId]);


  const navigate = useNavigate();
  

  const handleCartPage =  () => {
    setOpen(false);
    navigate('/newCart');
  }
  



return (
  <div className='cart'>
    <div className="cart_top">
      <h1> Products in your cart </h1>

    </div>

    {cartDetails.items?.map((item) => (
      <div className="item" key={item.id}>

        <img src={item.img} alt="" />

        <div className="details">
          <div className="h1"> {item.title} </div>
          <div className="p"> {item.desc?.substring(0, 20)}... </div>
          <div className="price"> {item.quantity} x ${item.price} </div>
        </div>

      
      </div>
    ))}


    <div className="total">
      <span> SUBTOTAL </span>
      <span> Rs : {cartDetails.Total}</span>
    </div>

   

   
      <button className="" onClick={handleCartPage} > More details </button>
  

  </div>
);
};

export default Cart;
