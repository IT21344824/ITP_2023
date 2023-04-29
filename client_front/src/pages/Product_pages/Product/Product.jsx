import React, { useState, useEffect } from 'react';
import './product.scss';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BalanceIcon from '@mui/icons-material/Balance';
import { collection, getDocs, addDoc, getDoc, doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { useParams } from 'react-router-dom'
import { addToCart } from '../../../redux/cartReducer';
import { useDispatch } from 'react-redux';
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
      console.log(item_type_data.Cat_name);
      return item_type_data.Cat_name.toString();

    } catch (error) {
      console.error(error);
      return "";
    }
  };

  //----------------------------------------------------------------------------------------

  useEffect(() => {
    const docRef = doc(db, "products", id);
    console.log(id)

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
            <span className="p-id">  ID : {product.Product_id} </span>
          </div>
          <h1>{product.item_name}</h1>
          <span className='price'> Rs : {product.price}</span>
          <p>{product.description}</p>

          <div className="quantity">
            <button onClick={() => setQuantity(prev => prev === 1 ? 1 : prev - 1)}> - </button>
            {quantity}
            <button onClick={() => setQuantity(prev => prev + 1)}> + </button>
          </div>

          <button className="add" disabled={product.status === "Out Of Stock"}
            onClick={() => dispatch(addToCart({
              id: product.Product_id,
              title: product.item_name,
              price: product.price,
              img: product.img,
              desc: product.description,
              quantity,
            }))}
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
