import './product.scss';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BalanceIcon from '@mui/icons-material/Balance';

import { collection, getDocs, addDoc, getDoc, doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";

import React, { useState, useEffect, useContext } from 'react';
import { useParams, Navigate , useNavigate } from 'react-router-dom'
import { addToCart } from '../../../redux/cartReducer';
import { useDispatch } from 'react-redux';
import { AuthContext } from "../../../context/AuthContext";
//import CatUpdate from '../category_update/CatUpdate'; // pass the page , id to update page

const Product = () => {
  const { id } = useParams()
  const [selectedImg, setSelectedImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});

  const dispatch = useDispatch()


  const [data, setData] = useState({});
  //console.log(id)

  //get-----------------------item-type-----------------------------------------------------

  const [itemTypeData, setItemTypeData] = useState({});

  const getItemTypeData = async (item_type_ref) => {
    if (!item_type_ref) {
      return "";
    }
    try {
      const snapshot = await getDoc(item_type_ref);
      const item_type_data = snapshot.data();
      if (!item_type_data) {
        return "";
      }
      // console.log(item_type_data.Cat_name);
      return item_type_data.Cat_name.toString();

    } catch (error) {
      console.error(error);
      return "";
    }
  };

  //----------------------------------------------------------------------------------------

  useEffect(() => {
    const docRef = doc(db, "products", id);
    // console.log(id)

    const unsubscribe = onSnapshot(docRef, async (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setProduct(data);

        // update the state with retrieved data
        const item_type_ref = data.item_type;

        getItemTypeData(item_type_ref).then((data) => {
          setItemTypeData((prevData) => ({ ...prevData, categoryDoc: data }));
        });
      } else {
        console.log("No such document!");
      }
    }, (error) => {
      console.log("Error getting document:", error);
    });

    // unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, [id]);


  //user excist--------------------------------------------
  //get uid
  const { currentUser } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (currentUser) {
      dispatch(
        addToCart({
          id: product.Product_id,
          title: product.item_name,
          price: product.price,
          img: product.img,
          desc: product.description,
          quantity,
         
        })
      );
    } else {
      // Redirect to login page or show a message
      navigate('/LogIn' );
      window.alert("Please log in first!"); // show alert if uid is null
    }
  };

  
  const userObj = JSON.parse(localStorage.getItem('userClient'));
  const uid = userObj?.uid;
  

  //get cart deiatls----------------------------------------------------------------------------------------------------------------------
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(''); 
  //get current user cart id
   useEffect(() => {
    // create a query to get the cart ID of the current user
    const userRef = doc(db, 'Users', uid);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      const CurrentcartId = doc.data()?.cartId;
      setCartId(CurrentcartId);
    });
    // unsubscribe from the listener when the component unmounts
    return () => unsubscribe();
  }, [uid]);
  //console.log('cart id: ' + cartId)

  //get current user cart details
  // useEffect(() => {
  //   if (cartId) {
  //     const cartRef = doc(db, 'cart', cartId);
  //     // create a query to get the cart items that belong to the user
  //     const cartItemsQuery = collection(cartRef, 'items');
  //     // subscribe to changes to the cart items
  //     const unsubscribe = onSnapshot(cartItemsQuery, (snapshot) => {
  //       const items = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data(),
  //       }));
  //       setCartItems(items);
  //     });
  //     // unsubscribe from the listener when the component unmounts
  //     return () => unsubscribe();
  //   }
  // }, []);
  console.log('cart id: ' + cartId)


  return (
    <div className='product'>
      <div className='top'>
        <div className="left">
          <div className="images">
            {product && product.img && product.img.length > 0 && (
              <>
                {product.img.map((imgUrl, index) => (
                  <img key={index} src={imgUrl} alt="" onClick={e => setSelectedImg(index)} className='notSelected' />
                ))}
              </>
            )}
          </div>

          <div className="mainImg">
            {product && product.img && product.img[selectedImg] && <img src={product.img[selectedImg]} alt="" />}
          </div>

        </div>


        <div className="right">

          <div >
            <span className="p-id">  Brand : {product.Product_id} </span>
          </div>
          <h1>{product.item_name}</h1>
          <span className='price'> Rs : {product.price}</span>
          <p>{product.description}</p>

          <div className="quantity">
            <button onClick={() => setQuantity(prev => prev === 1 ? 1 : prev - 1)}> - </button>
            {quantity}
            <button onClick={() => setQuantity(prev => prev + 1)}> + </button>
          </div>

          <button
            className="add"
            disabled={product.status === "Out Of Stock"}
            onClick={handleAddToCart}
          >
            <AddShoppingCartIcon /> ADD TO CART
          </button>

          <div className="links">
            <div className="item">
              <FavoriteBorderIcon /> ADD TO WISH LIST
            </div>

            <div className="item">
              <BalanceIcon /> ADD TO COMPARE
            </div>
          </div>

          <div className="info">
            {/* <span> Vendor : {product.vendor}</span> */}
            <span> Product type :
              <span className='type'> {itemTypeData.categoryDoc}</span>
            </span>
            <span > Available :
              <span className={`status ${product.status === 'In Stock' ? 'in-stock' : 'not-in-stock'}`}> {product.status}</span>
            </span>
          </div>

          <hr className='hr' />



        </div>

      </div>
      <div className="bot">

        <div className="details">
          <p> DESCRIPTION </p>

          <p> ADDITIONAL INFO </p>

          <p> FAQ </p>
        </div>

      </div>

    </div>
  );
}

export default Product;
