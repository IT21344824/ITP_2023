import React from 'react'
import "./PaymentSingle.scss";
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDoc, getDocs, addDoc, deleteDoc, doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

const PaymentSingle = () => {

    //image upload
    const [files, setFiles] = useState([]);
    const [per, setPer] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    //geting id from http
    const location = useLocation();
    const _id = location.state?.id;

    //geting selected data
    const [data, setData] = useState({});


    //get data
    useEffect(() => {
        if (_id) {
            const docRef = doc(db, "payment", _id);

            const unsubscribe = onSnapshot(docRef, async (doc) => {
                if (doc.exists()) {
                    const data = doc.data();
                    setData(data);

                } else {
                    console.log("No such document!");
                }
            }, (error) => {
                console.log("Error getting document:", error);
            });

            // unsubscribe from the listener when the component unmounts
            return () => unsubscribe();
        }
    }, [_id]);

    return (
        <div className='PaymentSingle'>

            <Sidebar />
            <div className="con">
                <Navbar />

                <div className="P_container">
                    <div className="pDetail">
                        <h1> Billing details </h1>

                        <div className='billDetails'>
                            <span>Name : {data?.oldformData?.fullName}</span>
                        </div>

                        <div className='billDetails'>
                            <span>Email : {data?.oldformData?.email}</span>
                        </div>

                        <div className='billDetails'>
                            <span>Address : {data?.oldformData?.address}</span>
                        </div>

                        <div className='billDetails'>
                            <span>City : {data?.oldformData?.city}</span>
                        </div>

                        <div className='billDetails'>
                            <span> Selected option : {data?.oldformData?.selectedOption}</span>
                        </div>
                    </div>


                    <div className="otherDetail ">
                        <h1>Bank slip details </h1>

                        <div className='bankDetails'>
                            <span> Img : </span>
                            <img src={data?.img} alt="" />                            
                        </div>

                        <div className='bankDetails'>
                            <span> Bank : {data?.bank}</span>
                        </div>

                        <div className='bankDetails'>
                            <span> Branch : {data?.branch}</span>
                        </div>

                        <div className='bankDetails'>
                            <span> Deposit Date : {data?.depositDate}</span>
                        </div>

                        <div className='bankDetails'>
                            <span> RefNo : {data?.refNo}</span>
                        </div>


                        <div className='bankDetails'>
                            <span> Deposit Amount : {data?.depositAmount}</span>
                        </div>


                    </div>



                </div>

            </div>
        </div>
    )

}

export default PaymentSingle
