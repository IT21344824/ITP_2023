import React from 'react'
import './OnlineP.scss'
import { useState } from 'react';


const OnlineP = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardNumberError, setCardNumberError] = useState("");
    const [expirationDateError, setExpirationDateError] = useState("");
    const [cvvError, setCvvError] = useState("");

    const handleCardNumberChange = (e) => {
        setCardNumber(e.target.value);
    };

    const handleExpirationDateChange = (e) => {
        setExpirationDate(e.target.value);
    };

    const handleCvvChange = (e) => {
        setCvv(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!cardNumber) {
            setCardNumberError("Please enter a valid card number.");
        } else {
            setCardNumberError("");
        }

        if (!expirationDate) {
            setExpirationDateError("Please enter a valid expiration date.");
        } else {
            setExpirationDateError("");
        }

        if (!cvv || !/^\d{3,4}$/.test(cvv)) {
            setCvvError("Please enter a valid 3 or 4 digit CVV.");
        } else {
            setCvvError("");
        }

        // Submit the payment form to your payment gateway provider
    };


    return (
        <div className="onlinePay">

        <div class="cart-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="card-number">Card Number</label>
                <input
                    type="text"
                    id="card-number"
                    name="card-number"
                    value={cardNumber}
                    placeholder="1111-2222-3333-4444"
                    onChange={handleCardNumberChange}
                />
                {cardNumberError && <p>{cardNumberError}</p>}

                <label htmlFor="expiration-date">Exp Month</label>
                <input
                    type="text"
                    id="expiration-date"
                    name="expiration-date"
                    placeholder="06/24"
                    value={expirationDate}
                    onChange={handleExpirationDateChange}
                />
                {expirationDateError && <p>{expirationDateError}</p>}

                <label htmlFor="cvv">CVV</label>
                <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    placeholder="352"
                    value={cvv}
                    onChange={handleCvvChange}
                />
                {cvvError && <p>{cvvError}</p>}
                
                    <button type="submit">Proceed</button>

            </form>
        </div>
        </div>

    )
}

export default OnlineP