import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import './Cart_page.scss'
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../redux/cartReducer';
import { resetCart } from '../../redux/cartReducer';
import { Link } from "react-router-dom";

const Cart = () => {

  const products = useSelector(state=>state.cart.products);
   const dispatch = useDispatch();

   const totalPrice=()=>{
    let total=0;
    products.forEach((item) => (total+=item.quantity*item.price));
      return total.toFixed(2); 

  
   }


  return (
    <div className='page_cart'>
      <table className='table'>
        <tr>
          <th><h1> Products in your cart </h1></th>
        </tr>
        <tr>
          {products?.map((item) => (
            <div className="item">
              <img src={item.img} alt="" />
              <div className="details">
                <h1> {item.title} </h1>
                {/* <p> {item.desc.substring(0, 100)} </p> */}
                <div className="price"> {item.quantity} x ${item.price} </div>
              </div>
              <DeleteIcon className='delete' onClick={()=> dispatch(removeItem(item.id))} />
            </div>
          ))}
        </tr>
        <tr>
          <div className="total">
            <span> SUBTOTAL </span>
            <span> Rs {totalPrice()} :</span>
          </div>
        </tr>
        <tr>
          <div className="check_reset">
            <Link to={"/payment"}>
            <button className='button'> PROCEED TO CHECKOUT </button>
            </Link>
            <button className='reset' onClick={()=> dispatch(resetCart())} > Reset</button>
          </div>
          </tr>
      </table>
   
    </div>
  )
}

export default Cart
