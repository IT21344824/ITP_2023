import { useEffect, useState } from "react";
import RoomIcon from '@mui/icons-material/Room';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { collection, getDocs, getDoc, addDoc, serverTimestamp, query, where, onSnapshot, doc } from "firebase/firestore";
import { db, storage, httpsCallable } from "../../firebase";
//import { sendContactUsEmail , functions } from "../../functions/index";
//import { functions } from '../../firebase';
import FaxIcon from '@mui/icons-material/Fax';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import './ContactUs.scss'
//notify-
//import NofitySuc from "../../../components/notify_status/nofity";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//--


const ContactUs = () => {

    //nofify--
    const notifyStyle = {
        whiteSpace: 'pre-line'
    }
    const progressStyle = {
        background: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)'
    }

    //---

    const initialFormData = {
        name: '',
        email: '',
        message: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!formData.name) {
            //alert("Please enter the name");
            toast.warn('Please enter the name!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        if (!/^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
            //alert("Please enter the Product_id");
            toast.warn('Please enter the valid email !', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            return;
          }


        if (!formData.message) {
            //alert("Please enter the message");
            toast.warn('Please enter the message!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        try {
            // Add the product data to the database
            const newProductRef = await addDoc(collection(db, "contactUs"), {
                ...formData,
                timeStamp: serverTimestamp(),
            });
            console.log("Document written with ID: ", newProductRef.id);
            // alert(`New Product have added and ID: ${newProductRef.id}`);

            // // Call Firebase Function to send email
            // const sendContactUsEmail = functions.httpsCallable("sendContactUsEmail");
            // await sendContactUsEmail({});
            // await functions.httpsCallable('sendEmail')({});


            //nofity

            toast.success(`Successful \n`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setFormData(initialFormData);


        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };


     //get details---------------------------------------------------------------------------------------------------------------------------------
    
     const _id = "MorePageContactUs";

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
        <div className='contents'>
            <div className="top">
                <h1> Contact Us </h1>
                <p>{data.CU_descrip}</p>
                {/* <p>From its medieval origins to the digital era, learn everything there is to know about the ubiquitous lorem ipsum passage</p> */}
            </div>

            <div className="container">
                <div className="contactInfo">

                    <div className="box">
                       
                        <div className="text">
                            <h3>Fax No</h3>
                            <p> {data.CU_fax} </p>
                            {/* <p>Robert Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678</p> */}
                        </div>
                        <div className="icon"><FaxIcon /></div>
                    </div>

                    <div className="box">
                        
                        <div className="text">
                            <h3>Phone </h3>
                            <p> {data.CU_phone} </p>
                        </div>
                        <div className="icon"><LocalPhoneIcon /></div>
                    </div>

                    <div className="box">
                       
                        <div className="text">
                            <h3>Email</h3>   
                            <p> {data.CU_email} </p>
                        </div>
                        <div className="icon"> <MailOutlineIcon /> </div>
                    </div>

                </div>
                <div className="contactForm">
                    <form onSubmit={handleSubmit}>
                        <h2>Send Message</h2>

                        <div className="inputbox">
                            <input
                                type="text"
                                name="name"
                                required="required"
                                onChange={handleInputChange}
                                value={formData.name}
                            />
                            <span>Full Name</span>
                        </div>

                        <div className="inputbox">
                            <input
                                type="text"
                                value={formData.email}
                                name="email"
                                required="required"
                                onChange={handleInputChange}
                            />
                            <span>Email</span>
                        </div>

                        <div className="inputbox">
                            <textarea
                                name="message"
                                cols="30" rows="10"
                                required="required"
                                value={formData.message}
                                onChange={handleInputChange}
                            ></textarea>
                            <span>Type your Message...</span>
                        </div>

                        <div className="inputbox">
                            <button type="submit" > Send</button>

                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default ContactUs
