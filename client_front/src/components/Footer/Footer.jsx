import React, { useState, useEffect } from 'react';
import "./footer.scss"
import { Link } from 'react-router-dom';

const Footer = ({ selectedLink , handleLinkClick }) => {
  //const [selectedLink, setSelectedLink] = useState('');

  // const handleFooterClick = (link) => {
  //   setSelectedLink(link);
  //   handleLinkClick(link);
  //   console.log(link)
  // };


  return (
    <div className='back_color'>
      <div className='footer'>
        <div className="top">

        <div className="item">
            <h1>Navigations </h1>
            <Link to="/" onClick={() => handleLinkClick('home')}>
              <span className={selectedLink === 'home' ? 'selected' : ''}>
                Home Page
              </span>
            </Link>
            <Link to="/Products" onClick={() => handleLinkClick('inventory')}>
              <span className={selectedLink === 'inventory' ? 'selected' : ''}>
                Inventory
              </span>
            </Link>
            <Link to="/Coach" onClick={() => handleLinkClick('coaching')}>
              <span className={selectedLink === 'coaching' ? 'selected' : ''}>
                Coach
              </span>
            </Link>
            <Link to="/Articals" onClick={() => handleLinkClick('articles')}>
              <span className={selectedLink === 'articles' ? 'selected' : ''}>
                Articals
              </span>
            </Link>
          </div>

          <div className="item">
            <h1 className="">Links</h1>
            <span>FAQ</span>
            <span>ABOUT US</span>
            <span>CONTACT US</span>
            <span>Articals</span>
          </div>
          <div className="item">
            <h1 className="">About</h1>
            <span>A job description summarizes the essential responsibilities,
              activities, qualifications and skills for a role. Also known as
              a JD, this document describes the type of work performed.
            </span>
          </div>
          <div className="item">
            <h1 className="">Contact</h1>
            <span>A job description summarizes the essential responsibilities,
              activities, qualifications and skills for a role. Also known as
              a JD, this document describes the type of work performed.
            </span>
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <span className="logo"></span>
            <span className="copyright"> © Copyright 2023 , All Right Reserved  </span>
          </div>
          <div className="right">

            <img src="/img/whatsapp.webp" alt="" />
            <img src="/img/payment.webp" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;
