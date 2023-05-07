import React, { useState, useEffect, useHistory } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import './Setting.scss'
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, resetCart } from '../../redux/cartReducer';
import { collection, getDocs, getDoc, addDoc, serverTimestamp, query, updateDoc, onSnapshot, doc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const Setting = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();
  //const history = useHistory();

  //get details-------------------------------------------------------------------------------


  //get uid
  const userObj = JSON.parse(localStorage.getItem('userClient'));
  const uid = userObj ? userObj.uid : null;

  const handleLogout = () => {    

    try {
      // Remove everything from local storage
      localStorage.clear();
      // Reset the cart in the Redux store
      dispatch(resetCart());
      // Refresh the page
      //window.location.reload();
      // Navigate to the login page
      navigate("/LogIn");
      //history.push("/LogIn");

    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div className='Setting'>
      <div className="cart_top">
        <h1> Settings </h1>

      </div>


      <div className="center">
        <ul>
          <Link to="#" style={{ textDecoration: "none" }} >
            <li >

              <AccountCircleIcon className="iocn" />
              <span> Profile </span>
            </li>
          </Link>
          <Link to="#" style={{ textDecoration: "none" }} >
            <li >

              <ManageAccountsIcon className="iocn" />
              <span> Settings </span>
            </li>
          </Link>
          <Link to="#" style={{ textDecoration: "none" }} >
            <li onClick={handleLogout}>

              <VpnKeyIcon className="iocn" />
              <span>  Log Out  </span>
            </li>
          </Link>


          {/* <div className="details">
          <Link className='' to="/" ><div > Profile</div>   </Link>
          <div > Settings </div>
          <div onClick={handleLogout}> Log Out </div>
        </div> */}
        </ul>

      </div>


    </div>
  );
};

export default Setting;
