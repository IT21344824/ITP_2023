import "./Contact.scss";
import React from 'react'
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import ContactTable from "../../../components/Contact_Apply_pages_comps/Contact_comps/ContactList";

//notify-
//import NofitySuc from "../../../components/notify_status/nofity";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//--


const Contact = () => {
    return (
        <div className="Contact_list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />

                <div className="PaymentTable">
                    <ContactTable  />
                </div>
            </div>
        </div>
    )
}

export default Contact
