import React from 'react'
import "./ApplycationsSingle.scss";
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDoc, getDocs, addDoc, deleteDoc, doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../firebase";
import Sidebar from "../../../../components/sidebar/Sidebar";
import Navbar from "../../../../components/navbar/Navbar";

const ApplycationsSingle = () => {

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
            const docRef = doc(db, "Applycations", _id);

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
        <div className='ApplycationsSingle'>

            <Sidebar />
            <div className="con">
                <Navbar />

                <div className="P_container">
                    <div className="pDetail">
                        <h1> Applycation details </h1>



                        <div className="animation_p_id">
                            <div className="p_details">
                                <div className="detail">

                                    <div className="center">

                                        <div className="p_inputbox">
                                            <span className="span"> Name : </span>
                                            <p>{data?.name ?? ''}</p>
                                        </div>


                                        <div className="p_inputbox">
                                            <span className="span"> Email : </span>
                                            <p>{data?.email ?? ''}</p>
                                        </div>

                                        <div className="p_inputbox">
                                            <span className="span"> phone : </span>
                                            <p>{data?.phone ?? ''}</p>
                                        </div>

                                        <div className="p_inputbox">
                                            <span className="span"> chooseRole : </span>
                                            <p>{data?.chooseRole ?? ''}</p>
                                        </div>

                                        <div className="p_inputbox">
                                            <span className="span"> Message : </span>
                                            <p>{data?.message ?? ''}</p>
                                        </div>
                                        
                                    </div>


                                </div>

                            </div>
                        </div>
                    </div>




                </div>

            </div>
        </div>
    )
}

export default ApplycationsSingle
