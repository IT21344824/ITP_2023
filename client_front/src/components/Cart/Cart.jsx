import React, { useState } from 'react'
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import './Cart.scss'

const Cart = () => {
 
  
    const data =[
        {
            id : 1,
            img:"https://cdn.shopify.com/s/files/1/0564/2439/9023/products/PRE20OM22465011822V1.2-FRONT-1200_1024x1024.png?v=1675879828",
            img2:"https://cdn.shopify.com/s/files/1/0564/2439/9023/products/iso_ml_front_5aaa74c2-6a9e-411b-8778-4c9cf4c27ed2_1024x1024.png?v=1675113217",
            title:"hi im akidu",
            desc:"hi im akidu this is a wery long descri[tion so don't botter me",
            isNew:true,
            oldprice:19,
            price:100,
        },
        {
            id : 2,
            img:"https://cdn.shopify.com/s/files/1/0564/2439/9023/products/PRE20OM22465011822V1.2-FRONT-1200_1024x1024.png?v=1675879828",
            img2:"https://cdn.shopify.com/s/files/1/0564/2439/9023/products/iso_ml_front_5aaa74c2-6a9e-411b-8778-4c9cf4c27ed2_1024x1024.png?v=1675113217",        
            title:"hi im anuka",
            desc:"hi im akidu this is a wery long descri[tion so don't botter me",
            isNew:false,
            oldprice:19,
            price:500,
        },
    ];
  
    return (
    <div className='cart'>
      <h1> Products in your cart </h1>
      {data?.map((item) => (
        <div className="item">
          <img src={item.img} alt="" />
          <div className="details">
              <h1> {item.title} </h1>
              <p> {item.desc.substring(0,100)} </p>
              <div className="price"> 1 x ${item.price} </div>
          </div>
          <DeleteIcon className='delete'/>
        </div>
      ))}
      <div className="total">
        <span> SUBTOTAL </span>
        <span> Rs : 2324 </span>
      </div>
      <button> PROCEED TO CHECKOUT </button>
      <span className='reset' > Reset</span>

      <Link className='' to="/newCart" >
      <div className="" > More details </div>
      </Link>
      
    </div>
  );
};

export default Cart
