import "./Payment_pg.scss";
import React from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import PaymentTable from "../../components/Payment_comp/PaymentList";

//notify-
//import NofitySuc from "../../../components/notify_status/nofity";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//--


const Payment_pg = () => {
    return (
        <div className="Payment_pg_list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />

                <div className="PaymentTable">
                    <PaymentTable  />
                </div>
            </div>
        </div>
    )
}

export default Payment_pg
