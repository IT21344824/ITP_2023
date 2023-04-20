import React from 'react'
import AdditionalHome from '../../../components/Additional_comp/Home/Home'
import ProductPanner from '../../../components/Additional_comp/product_banner/product_banner'

import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./Additional_pg.scss";
import Addi_nav from '../../../components/Additional_comp/Addi_navbar/Addi_nav'
import { Link } from "react-router-dom";


const Additional_pg = () => {
    return (
        <div className='Additional_pg'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div>
                    <Addi_nav />
                    <AdditionalHome />
                    <ProductPanner />
                </div>


            </div>

        </div>
    )
}

export default Additional_pg
