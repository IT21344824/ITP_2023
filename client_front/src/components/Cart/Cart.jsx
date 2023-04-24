import React, { useState } from 'react'
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import './Cart.scss'
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../redux/cartReducer';
import { resetCart } from '../../redux/cartReducer';


const Cart = () => {
 
  
   const products = useSelector(state=>state.cart.products);
   const dispatch = useDispatch();

   const totalPrice=()=>{
    let total=0;
    products.forEach((item) => (total+=item.quantity*item.price));
      return total.toFixed(2); 

  
   }

    return (
    <div className='cart'>
      <h1> Products in your cart </h1>
      {products?.map((item) => (
        <div className="item">
          <img src={item.img} alt="" />
          <div className="details">
              <h1> {item.title} </h1>
              {/* <p> {item.desc.substring(0,100)} </p> */}
              <div className="price"> {item.quantity} x ${item.price} </div>
          </div>
          <DeleteIcon className='delete' onClick={()=> dispatch(removeItem(item.id))} />
        </div>
      ))}
      <div className="total">
        <span> SUBTOTAL </span>
        <span> Rs : {totalPrice()}</span>
      </div>
      
      <span className='reset' onClick={()=> dispatch(resetCart())}  > Reset</span>

      <Link className='' to="/newCart" >
      <div className="" > More details </div>
      </Link>
      
    </div>
  );
};

export default Cart;
