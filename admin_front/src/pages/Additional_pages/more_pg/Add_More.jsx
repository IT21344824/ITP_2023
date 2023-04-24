import React from 'react'
import ProductPanner from '../../../components/Additional_comp/product_banner/product_banner'
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/sidebar/Sidebar";
import "./Add_More.scss";
import Addi_nav from '../../../components/Additional_comp/Addi_navbar/Addi_nav'
import { Link } from "react-router-dom";
import MoreHome from '../../../components/Additional_comp/More/Add_more_comp'
import AboutUs from '../../../components/Additional_comp/More/Abou_us/AboutUs'
import ConactUs from '../../../components/Additional_comp/More/Contact_us/ConactUs'
import ApplyForm from '../../../components/Additional_comp/More/Apply_form/ApplyForm'
//notify-
//import NofitySuc from "../../../components/notify_status/nofity";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//--


const Add_More = () => {

    //nofify--
    const notifyStyle = {
        whiteSpace: 'pre-line'
    }
    const progressStyle = {
        background: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)'
    }

    //---

    return (
        <div className='Add_More'>
            <Sidebar />
            <div className="conyainer_add">
                <Navbar />
                <div>
                    <Addi_nav />
                    <MoreHome />
                    <AboutUs />
                    <ConactUs />
                    <ApplyForm />
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

export default Add_More
