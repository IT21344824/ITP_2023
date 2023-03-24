import React from 'react'
import "./Results.scss";
import { Link } from "react-router-dom";

const Results = ({ searchQuery }) => {
  const items = [
    { name: "Home", to: "/" },
    //---------------------------
    { name: "LogIn", to: "/LogIn" },
    { name: "SignUp", to: "/SignUp" },
    //-----------------prodcuts search---------------------
    { name: "All Products", to: "/Products" },
    { name: "New Products", to: "/Products" },
        //
    { name: "Latest Products ", to: "/" },
    { name: "All category", to: "/products" },
    //----------------------------------------------------
    { name: "Coachs", to: "/Coach" },
    { name: "Articals", to: "/Articals" },
    
    { name: "About Us", to: "/aboutUs" },
    { name: "Contact Us", to: "/contactUs" },
  ];

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='results'>
      <div className="results_container">
        {filteredItems.length === 0 ?
          <div>No data found</div>
          : filteredItems.map((items, index) => (
            <Link key={index} to={items.to} style={{ textDecoration: "none" }}>
              <div className="filter_search">{items.name}</div>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default Results
