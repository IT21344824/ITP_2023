import "./Applycations_pg.scss";
import React from 'react'
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import ApplycationTable from "../../../components/Contact_Apply_pages_comps/Applycations_comps/ApplycationsList";

//notify-
//import NofitySuc from "../../../components/notify_status/nofity";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//--


const Applycations_pg = () => {
    return (
        <div className="Applycations_pg_list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />

                <div className="PaymentTable">
                    <ApplycationTable  />
                </div>
            </div>
        </div>
    )
}

export default Applycations_pg
