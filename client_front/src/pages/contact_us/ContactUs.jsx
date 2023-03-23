import React from 'react'
import RoomIcon from '@mui/icons-material/Room';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { collection, getDocs, getDoc, addDoc, serverTimestamp, query, where, onSnapshot ,doc } from "firebase/firestore";
//import { db, storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import './ContactUs.scss'

const ContactUs = () => {

  
    // exports.sendEmail = functions.https.onRequest(async (req, res) => {
    //     // Extract the form data from the request body
    //     const name = req.body.name;
    //     const email = req.body.email;
    //     const message = req.body.message;
      
    //     // Create an email message
    //     const mailOptions = {
    //       from: `${name} <${email}>`,
    //       to: 'itp.2ndyear.project@gmail.com',
    //       subject: 'New Message from Contact Form',
    //       text: message,
    //     };

    //     try {
    //         await admin
    //           .firestore()
    //           .collection('messages')
    //           .add({
    //             name: name,
    //             email: email,
    //             message: message,
    //           });
    //         await admin
    //           .firestore()
    //           .collection('mail')
    //           .add(mailOptions);
    //         res.send('Email sent successfully');
    //       } catch (error) {
    //         console.error('Error sending email', error);
    //         res.status(500).send('Error sending email');
    //       }
    //     });
    return (
        <div className='contents'>
            <div className="top">
                <h1> Contact Us </h1>
                <p>From its medieval origins to the digital era, learn everything there is to know about the ubiquitous lorem ipsum passage</p>
            </div>

            <div className="container">
                <div className="contactInfo">

                    <div className="box">
                        <div className="icon"><RoomIcon/></div>
                        <div className="text">
                            <h3>Address</h3>
                            <p>Robert Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678</p>
                        </div>
                    </div>

                    <div className="box">
                        <div className="icon"><LocalPhoneIcon/></div>
                        <div className="text">
                            <h3>Phone</h3>
                            <p>+94 999 000 9999</p>
                        </div>
                    </div>

                    <div className="box">
                        <div className="icon"> <MailOutlineIcon/> </div>
                        <div className="text">
                            <h3>Email</h3>
                            <p>xxxxxxxxxxx@gmail.com</p>
                        </div>
                    </div>

                </div>
                <div className="contactForm">
                    <form action="/sendEmail" method="POST">
                        <h2>Send Message</h2>

                        <div className="inputbox">
                            <input type="text" name="name" required="required" />
                            <span>Full Name</span>
                        </div>

                        <div className="inputbox">
                            <input type="text" name="email" required="required" />
                            <span>Email</span>
                        </div>

                        <div className="inputbox">
                           <textarea name="message" cols="30" rows="10" required="required"></textarea>
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
