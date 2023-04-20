import React from 'react'
import MoreHome from '../../../components/Additional_comp/More/Add_more_comp'
import ProductPanner from '../../../components/Additional_comp/product_banner/product_banner'
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./Add_More.scss";
import Addi_nav from '../../../components/Additional_comp/Addi_navbar/Addi_nav'
import { Link } from "react-router-dom";

const Add_More = () => {
    return (
        <div className='Add_More'>
            <Sidebar />
            <div className="conyainer_add">
                <Navbar />
                <div>
                    <Addi_nav />
                    <MoreHome />
                   
                </div>
            </div>

        </div>
    )
}

export default Add_More
