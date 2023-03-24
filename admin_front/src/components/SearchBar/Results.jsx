import React from 'react'
import "./Results.scss";
import { Link } from "react-router-dom";

const Results = ({ searchQuery }) => {
  const items = [
    { name: "Home", to: "/" },
    { name: "Users", to: "/Users" },
    { name: "Add a New User", to: "/Users/new" },
    //-----------------prodcuts search---------------------
    { name: "All products", to: "/products" },
    { name: "Add a New Product", to: "/products/new" },
        //cat
    { name: "Add a New category", to: "/products" },
    { name: "All category", to: "/products" },
    //----------------------------------------------------
    { name: "Employees", to: "/Employees" },
    { name: "members", to: "/members" },
    { name: "coaches", to: "/coaches" },
    { name: "packages", to: "/packages" },
    { name: "patment info", to: "/patment_INFO" },
  ];

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='results'>
      <div className="">
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
