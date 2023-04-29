import React from 'react'
import './OnlineP.scss'
import { useState } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import { collection, getDocs, getDoc, addDoc, serverTimestamp, query, where, onSnapshot, doc } from "firebase/firestore";
import { db, storage } from "../../../firebase";

const OnlineP = () => {

    const location = useLocation();
    const oldformData = location.state;

   //console.log(oldformData)
    const [cardNumberError, setCardNumberError] = useState("");
    const [expirationDateError, setExpirationDateError] = useState("");
    const [cvvError, setCvvError] = useState("");

    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if (!formData.cardNumber) {
        //     setCardNumberError("Please enter a valid card number.");
        //     return;
        // } else {
        //     setCardNumberError("");
        // }

        // if (!formData.expirationDate) {
        //     setExpirationDateError("Please enter a valid expiration date.");
        //     return;
        // } else {
        //     setExpirationDateError("");
        // }

        // if (!formData.cvv || !/^\d{3,4}$/.test(formData.cvv)) {
        //     setCvvError("Please enter a valid 3 or 4 digit CVV.");
        //     return;
        // } else {
        //     setCvvError("");
        // }

        // Submit the payment form to your payment gateway provider
       
        console.log(formData)

        // Add the package data to the database

          const newProductRef = await addDoc(collection(db, "payment"), {
            ...formData,oldformData,
            //oldformData,
            timeStamp: serverTimestamp(),
        });

        console.log("Document written with ID: ", newProductRef.id);
        alert(`New Product have added and ID: ${newProductRef.id}`);

        setFormData(initialFormData);
        navigate('/OrderDSuccess');
    };

        //  data
        const initialFormData = {
            cardNumber: "",
            expirationDate: "",
            cvv: "",
        };
    
        const [formData, setFormData] = useState(initialFormData);
    
        const handleInputChange = (event) => {        
            const { name, value } = event.target;
            setFormData({ ...formData, [name]: value });
        };


    return (
        <div className="onlinePay">

        <div className="cart-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="card-number">Card Number</label>
                <input
                    type="text"
                    id="card-number"
                    name="cardNumber"
                    value={formData.cardNumber}
                    placeholder="1111-2222-3333-4444"
                    onChange={handleInputChange}
                />
                {cardNumberError && <p>{cardNumberError}</p>}

                <label htmlFor="expiration-date">Exp Month</label>
                <input
                    type="text"
                    id="expiration-date"
                    name="expirationDate"
                    placeholder="06/24"
                    value={formData.expirationDate}
                    onChange={handleInputChange}
                />
                {expirationDateError && <p>{expirationDateError}</p>}

                <label htmlFor="cvv">CVV</label>
                <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    placeholder="352"
                    value={formData.cvv}
                    onChange={handleInputChange}
                />
                {cvvError && <p>{cvvError}</p>}
                
                    <button type="submit" >Proceed</button>

            </form>
        </div>
        </div>

    )
}

export default OnlineP