import React, { useState } from 'react'
import "./navbar.scss";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Cart from '../Cart/Cart';

const Navbar = () => {

  const [open ,setOpen] = useState(false)

  return (
    <div className='navbar'>
      <div className="wrapper">
        <div className="top_section">
          <div className="left">
            <Link to="/">
              <img src="/img/logo.jpeg" alt="" className='logo' />
            </Link>
          </div>
          <div className="right">

            <div className="l_s">
              <Link className='link log_sign' to="/LogIn">
                <div className='log'>log in</div>
              </Link>
              <Link className='link log_sign' to="/SignUp">
                <div className='reg'>Sign Up</div>
              </Link>
            </div>

            <div className="icons">
              <SearchIcon />
              <PersonIcon />
              <FavoriteBorderIcon />
              <div className="cartIocn" onClick={()=>setOpen(!open)}>
                <ShoppingCartOutlinedIcon />
                <span>0</span>
              </div>

              
            </div>

          </div>

        </div>
        <div className="bot_section">
          <div className="item">
            <Link className='link' to="/"> Home Page </Link>
          </div>
          <div className="item">
            <Link className='link' to="/Products"> Inventory </Link>
          </div>
          
          <div className="item">
            <Link className='link' to="/Coach"> Coaching </Link>
          </div>
          <div className="item">
            <Link className='link' to="/Articals"> Articals </Link>
          </div>

        </div>

      </div>
      {open && <Cart/>}
    </div>
  )
}

export default Navbar
