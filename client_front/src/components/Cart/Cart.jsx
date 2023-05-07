import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import './Cart.scss'
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, resetCart } from '../../redux/cartReducer';
import { collection, getDocs, getDoc, addDoc, serverTimestamp, query, updateDoc, onSnapshot, doc } from "firebase/firestore";
import { db, storage } from "../../firebase";

const Cart = () => {

  const products = useSelector(state => state.cart.products);
  const dispatch = useDispatch();

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => (total += item.quantity * item.price));
    return total.toFixed(2);
  };

  //get details-------------------------------------------------------------------------------
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState('');

  //get uid
  const userObj = JSON.parse(localStorage.getItem('userClient'));
  const uid = userObj ? userObj.uid : null;

  //get current user cart id
  useEffect(() => {
    // create a query to get the cart ID of the current user
    const userRef = doc(db, 'Users', uid);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      const cartId = doc.data()?.cartId;
      setCartId(cartId);
    });
    // unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, [uid]);
  //console.log('cart id: ' + cartId)

  //get current user cart details
  useEffect(() => {
    if (cartId) {
      const cartRef = doc(db, 'cart', cartId);
      // create a query to get the cart items that belong to the user
      const cartItemsQuery = collection(cartRef, 'items');
     
      const unsubscribe = onSnapshot(cartItemsQuery, (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCartItems(items);
      });
     
      return () => unsubscribe();
    }
  }, [cartId]);

  //console.log('cart data: ' + cartItems)

  // save data in cart------------------------------------------------------------------------------------------------------------------

  const handleSaveCart = async (event) => {
    event.preventDefault();

    //Add the product data to the database
    const newProductRef = await updateDoc(doc(db, "cart", cartId), {
      cartItems: products,
      timeStamp: serverTimestamp(),
    });
  }

  //console.log(products);

  return (
    <div className='cart'>
      <div className="cart_top">
        <h1> Products in your cart </h1>
        <button className='savebtn' onClick={handleSaveCart}>save</button>
      </div>

      {products?.map((item) => (
        <div className="item" key={item.id}>

          <img src={item.img} alt="" />

          <div className="details">
            <div className="h1"> {item.title} </div>
            <div className="p"> {item.desc?.substring(0, 20)}... </div>
            <div className="price"> {item.quantity} x ${item.price} </div>
          </div>

          <DeleteIcon className='delete' onClick={() => dispatch(removeItem(item.id))} />
        </div>
      ))}


      <div className="total">
        <span> SUBTOTAL </span>
        <span> Rs : {totalPrice()}</span>
      </div>

      <span className='reset' onClick={() => dispatch(resetCart())}  > Reset</span>

      <Link className='' to="/newCart" >
        <div className="" > More details </div>
      </Link>

    </div>
  );
};

export default Cart;
