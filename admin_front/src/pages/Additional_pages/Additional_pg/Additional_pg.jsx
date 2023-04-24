import React from 'react'
import AdditionalHome from '../../../components/Additional_comp/Home/Home'
import ProductPanner from '../../../components/Additional_comp/product_banner/product_banner'
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./Additional_pg.scss";
import Addi_nav from '../../../components/Additional_comp/Addi_navbar/Addi_nav'
import { Link } from "react-router-dom";
//notify-
//import NofitySuc from "../../../components/notify_status/nofity";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//--


const Additional_pg = () => {

    //nofify--
    const notifyStyle = {
        whiteSpace: 'pre-line'
    }
    const progressStyle = {
        background: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)'
    }

    //---

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
            <ToastContainer
                position="top-right"
                autoClose={5000}
                limit={6} //-
                hideProgressBar={false}
                newestOnTop={false} //-
                closeOnClick
                rtl={false} //--
                pauseOnFocusLoss //--
                draggable
                pauseOnHover
                theme="colored"
                style={notifyStyle}
            // progressStyle={progressStyle}
            />
        </div>
    )
}

export default Additional_pg
