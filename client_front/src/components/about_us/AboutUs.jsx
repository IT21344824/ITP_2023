import React from 'react'
import './AboutUs.scss'
import RoomIcon from '@mui/icons-material/Room';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../../firebase';
import { collection,doc, onSnapshot, query, where } from 'firebase/firestore';

const AboutUs = () => {
    //get details---------------------------------------------------------------------------------------------------------------------------------
    
    const _id = "MorePageAboutUs";

    //geting selected data
    const [data, setData] = useState({});

    
    useEffect(() => {
        const docRef = doc(db, "client_home_pg", _id);

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
    }, [_id]);

    return (
        <div className='AboutUs'>
            <h1> About Us </h1>
            <div className="wrapper">
                <div className="content">
                    <div className="top">

                        <div className="left">
                            <h3> {data.AU_title} </h3>
                            <p> {data.AU_descrip}</p>
                        </div>
                        
                        <div className="right">
                            <div className="img">
                                <img src={data.img}alt="" className='icons' />  
                                {/* <img src="/more_pg/about_us_img.jpg"alt="" className='icons' />   */}
                                
                            </div>

                        </div>
                    </div>
                    <div className="follow">
                        <div className="btn_body">
                            <a href='#' className="test_btn btn6"> follow  </a>

                        </div>
                    </div>
                    <div className="social">
                        {/* <a href="https://web.facebook.com/ELITEGYMKANDY/?_rdc=1&_rdr"> <img src="/home_page/fb.png" alt="" className='icons' /> </a>
                        <a href="https://www.instagram.com/elite_gym_kandy/?hl=en"> <img src="/home_page/insta.png" alt="" className='icons' /> </a>
                        <a href="#"> <img src="/home_page/twitter.png" alt="" className='icons' /> </a> */}
                        <a href={data.AU_facebook}> <img src="/home_page/fb.png" alt="" className='icons' /> </a>
                        <a href={data.AU_insta}> <img src="/home_page/insta.png" alt="" className='icons' /> </a>
                        <a href={data.AU_twitter}> <img src="/home_page/twitter.png" alt="" className='icons' /> </a>

                    </div>

                    <div className="contactInfo">

                        <div className="box">
                            <div className="icon"><RoomIcon /></div>
                            <div className="text">
                                <h3>Address</h3>
                                <p>{data.AU_address}</p>
                            </div>
                        </div>

                        <div className="box">
                            <div className="icon phone"><LocalPhoneIcon /></div>
                            <div className="text phone">
                                <h3 >Phone</h3>
                                <p>{data.AU_phone}</p>
                            </div>
                        </div>

                        <div className="box">
                            <div className="icon"> <MailOutlineIcon /> </div>
                            <div className="text">
                                <h3>Email</h3>
                                <p>{data.AU_email}</p>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default AboutUs
