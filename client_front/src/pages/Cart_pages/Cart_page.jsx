import React, { useState, useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import './Cart_page.scss'
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../redux/cartReducer';
import { resetCart } from '../../redux/cartReducer';
import { collection, arrayRemove, getDoc, addDoc, serverTimestamp, query, updateDoc, onSnapshot, doc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { Link } from "react-router-dom";

const Cart = () => {

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


  // Rest
  const handleCartReset = async () => {
    const cartRef = doc(db, 'cart', cartId);
    const cartSnapshot = await getDoc(cartRef);
    const cartData = cartSnapshot.data();

    // Reset the cart items to an empty array and set the total to 0
    await updateDoc(cartRef, {
      items: [],
      Total: 0
    });

    alert("Cart reset successfully.");
  }

  //  Delete
  const handleDeleteItem = async (itemId) => {
    const cartRef = doc(db, 'cart', cartId);

    // Remove the item from the `items` array in the `cart` document
    await updateDoc(cartRef, {
      items: arrayRemove(cartDetails.items.find(item => item.id === itemId))
    });

    alert("Item deleted successfully.");
  }




  return (
    <div className='page_cart'>
      <table className='table'>
        <tr>
          <th><h1> Products in your cart </h1></th>
        </tr>
        <tr>
          {cartDetails.items?.map((item) => (
            <div className="item" key={item.id}>

              <img src={item.img} alt="" />

              <div className="details">
                <div className="h1"> {item.title} </div>
                <div className="p"> {item.desc?.substring(0, 20)}... </div>
                <div className="price"> {item.quantity} x ${item.price} </div>
              </div>

              <DeleteIcon className='delete' onClick={() => handleDeleteItem(item.id)} />
            </div>
          ))}
        </tr>
        <tr>
          <div className="total">
            <span> SUBTOTAL </span>
            <span> Rs :  {cartDetails.Total}</span>
          </div>
        </tr>
        <tr>
          <div className="check_reset">
            <Link to={{
              pathname: '/payment',
              state: { total: cartDetails.Total }
            }}>
              <button className='button'> PROCEED TO CHECKOUT </button>
            </Link>
            <button className='reset' onClick={handleCartReset} > Reset</button>
          </div>
        </tr>
      </table>

    </div>
  )
}

export default Cart
