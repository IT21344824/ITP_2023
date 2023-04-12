import React from 'react'
import AdditionalHome from '../../components/Additional_comp/Home/Home'
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Additional_pg.scss";


const Additional_pg = () => {
    return (
        <div className='Additional_pg'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <AdditionalHome />
            </div>

        </div>
    )
}

export default Additional_pg
