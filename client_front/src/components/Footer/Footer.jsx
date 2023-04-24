import React, { useState, useEffect } from 'react';
import "./footer.scss"
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { collection,doc, onSnapshot, query, where } from 'firebase/firestore';
const Footer = ({ selectedLink, handleLinkClick }) => {
  //const [selectedLink, setSelectedLink] = useState('');

  // const handleFooterClick = (link) => {
  //   setSelectedLink(link);
  //   handleLinkClick(link);
  //   console.log(link)
  // };

   //about us --get details---------------------------------------------------------------------------------------------------------------------------------
    
   const about_id = "MorePageAboutUs";

   //geting selected data
   const [aboutData, setAboutData] = useState({});

   
   useEffect(() => {
       const docRef = doc(db, "client_home_pg", about_id);

       const unsubscribe = onSnapshot(docRef, async (doc) => {
           if (doc.exists()) {
               const data = doc.data();
               setAboutData(data);
           } else {
               console.log("No such document!");
           }
       }, (error) => {
           console.log("Error getting document:", error);
       });

       // unsubscribe from the listener when the component unmounts
       return () => unsubscribe();
   }, [aboutData]);

    //contactus us --get details---------------------------------------------------------------------------------------------------------------------------------
    
    const contact_id = "MorePageContactUs";

    //geting selected data
    const [contactData, setContactData] = useState({});
 
    
    useEffect(() => {
        const docRef = doc(db, "client_home_pg", contact_id);
 
        const unsubscribe = onSnapshot(docRef, async (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setContactData(data);
            } else {
                console.log("No such document!");
            }
        }, (error) => {
            console.log("Error getting document:", error);
        });
 
        // unsubscribe from the listener when the component unmounts
        return () => unsubscribe();
    }, [contact_id]);


  return (
    <div className='back_color'>
      <div className='footer'>
        <div className="top">

          <div className="item">
            <h1>Navigations </h1>
            <Link to="/" onClick={() => handleLinkClick('home')}>
              <span className={selectedLink === 'home' ? 'selected' : ''}>
                Home Page
              </span>
            </Link>
            <Link to="/Products" onClick={() => handleLinkClick('inventory')}>
              <span className={selectedLink === 'inventory' ? 'selected' : ''}>
                Inventory
              </span>
            </Link>
            <Link to="/Coach" onClick={() => handleLinkClick('coaching')}>
              <span className={selectedLink === 'coaching' ? 'selected' : ''}>
                Coach
              </span>
            </Link>
            <Link to="/More" onClick={() => handleLinkClick('articles')}>
              <span className={selectedLink === 'articles' ? 'selected' : ''}>
                More
              </span>
            </Link>
          </div>

          <div className="item">
            <h1 className="">Links</h1>
            <span>FAQ</span>
            <span>ABOUT US</span>
            <span>CONTACT US</span>
            <span>Articals</span>
          </div>

          <div className="item">
            <h1 className="">About</h1>
            <span> 
            {aboutData.AU_descrip ? aboutData.AU_descrip.substring(0, 200) : ''}
              {/* A job description summarizes the essential responsibilities,
              activities, qualifications and skills for a role. Also known as
              a JD, this document describes the type of work performed. */}
            </span>
          </div>

          

          <div className="item">
            <h1 className="">Contact</h1>
            <span className='Contact'>
              {/* {contactData.CU_descrip ? contactData.CU_descrip.substring(0, 200) : ''} */}
              A job description summarizes the essential responsibilities,
              activities, qualifications and skills for a role. Also known as
              a JD, this document describes the type of work performed.
            </span>
          </div>
         
         
        </div>


        <div className="bottom">
          <div className="left">
            <span className="logo"></span>
            <span className="copyright"> © Copyright 2023 , All Right Reserved  </span>
          </div>
          <div className="right">

            <img src="/img/whatsapp.webp" alt="" />
            <img src="/img/payment.webp" alt="" />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Footer;
