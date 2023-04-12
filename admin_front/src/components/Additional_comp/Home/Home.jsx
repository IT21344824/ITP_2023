import React from 'react'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.scss";


const Home = () => {
    return (
        <div className='Home_comp'>

            <div className="datatableTitle">
                Add New Home page
                <Link to="/Additional/home/new" className="link" >
                    Add New
                </Link>
            </div>
        </div>
    )
}

export default Home
