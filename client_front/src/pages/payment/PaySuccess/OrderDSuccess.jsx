import React from 'react';
import { Link } from 'react-router-dom';
import './PaySuccess.scss'

const OrderDSuccess = () => {
  
  return (
    <div className='sucsess'>
      <div className='prossess'>
      <h1 style={{ color: 'white' }}>Your payment is prossesing</h1>
      </div>
      
      <div >
      <Link to="/">
        <button className='btn'>Go back to Home</button>
      </Link>
      </div>
      
    </div>
  );
}

export default OrderDSuccess;