import React from 'react';
import { Link } from 'react-router-dom';
import './PaySuccess.scss'

const OrderDSuccess = () => {
  return (
    <div>
      <p>Your payment is successful!</p>
      <Link to="/">
        <button>Go to Home</button>
      </Link>
    </div>
  );
}

export default OrderDSuccess;