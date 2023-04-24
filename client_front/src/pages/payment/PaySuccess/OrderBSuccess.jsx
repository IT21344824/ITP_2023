import React from 'react';
import { Link } from 'react-router-dom';
import './PaySuccess.scss'

const OrderBSuccess = () => {
  return (
    <div>
      <p style={{ color: 'red' }}>Your payment is prossesing</p>
      <Link to="/">
        <button>Go to Home</button>
      </Link>
    </div>
  );
}

export default OrderBSuccess;