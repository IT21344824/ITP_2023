import React from 'react'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Addi_nav.scss";


const Home = () => {
    return (
        <div className='Addi_nav'>
           
            <div className="datatableTitle">
                Client Home page
                <Link to="/Additional" className="link" >
                    View
                </Link>
            </div>
            <div className="datatableTitle">
                Client More page
                <Link to="/Additional/more" className="link" >
                    View
                </Link>
            </div>
        </div>
    )
}

export default Home
