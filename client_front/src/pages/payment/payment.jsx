import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './payment.scss'
// import { collection, getDocs, addDoc, getDoc, doc, onSnapshot, serverTimestamp } from "firebase/firestore";
// import { db } from "../../../firebase"

const Payment = () => {
    const [visibleA, setVisibleA] = useState(false);
    const [visibleB, setVisibleB] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // radio button change handler
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    // input field change handlers
    const handleFullNameChange = (event) => {
        setFullName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };



    // form submit handler
    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validate();
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            if (selectedOption === 'option1') {
                navigate('/DirectP');
            } else if (selectedOption === 'option2') {
                navigate('/OnlineP');
            }
        }
    };

    // form validation function
    const validate = () => {
        const errors = {};
        if (!fullName.trim()) {
            errors.fullName = 'Full name is required';
        }
        if (!address.trim()) {
            errors.address = 'Address is required';
        }
        if (!city.trim()) {
            errors.city = 'City name is required';
        }
        if (!email.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email address is invalid';
        }

        return errors;
    };

    return (
        <div className="payment">
            <div className="row">
                <div className="col-75">
                    <div className="container">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-50">
                                    <h3>Billing Address</h3>
                                    <div className="form-group">
                                        <label htmlFor="fname">
                                            <i className="fa fa-user"></i> Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="fname"
                                            name="firstname"
                                            placeholder="John M. Doe"
                                            value={fullName}
                                            onChange={handleFullNameChange}
                                            className={errors.fullName && 'is-invalid'}
                                        />
                                        {errors.fullName && (
                                            <div className="invalid-feedback">{errors.fullName}</div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">
                                            <i className="fa fa-envelope"></i> Email
                                        </label>
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            placeholder="john@example.com"
                                            value={email}
                                            onChange={handleEmailChange}
                                            className={errors.email && 'is-invalid'}
                                        />
                                        {errors.email && (
                                            <div className="invalid-feedback">{errors.email}</div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">
                                            <i className="fa fa-address-card-o"></i> Address
                                        </label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            placeholder="542 W. 15th Street"
                                            value={address}
                                            onChange={handleAddressChange}
                                            className={errors.address && 'is-invalid'}
                                        />
                                        {errors.address && (
                                            <div className="invalid-feedback">{errors.address}</div>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="city">
                                            <i className="fa fa-institution"></i> City
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            placeholder="Kandy"
                                            value={city}
                                            onChange={handleCityChange}
                                            className={errors.city && 'is-invalid'}
                                        />
                                        {errors.city && (
                                            <div className="invalid-feedback">{errors.city}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="col-50">
                                    <h3>Payment</h3>

                                    <div className="form-group">
                                        <label>
                                            <input
                                                type="radio"
                                                name="option"
                                                value="option1"
                                                checked={selectedOption === 'option1'}
                                                onChange={handleOptionChange}
                                                onClick={() => { setVisibleA(true); setVisibleB(false) }}

                                            />
                                            Direct bank transfer
                                        </label>
                                        {visibleA &&
                                            <div className='hide1'><p>Make your payment directly into our bank account. Please use your Order ID & name as the payment reference. Your order will not be shipped until the funds have cleared in our account. You can send us a transaction proof to our Instagram or Facebook page with your Order ID number.
                                                <br />
                                                <br />
                                                Bank Details -
                                                <br />
                                                <br />
                                                Account name - Health and Fitness Pvt
                                                <br />
                                                Account number - 222233334444
                                                <br />
                                                <br />
                                                Bank - HNB
                                                <br />
                                                Branch - Kandy</p></div>
                                        }

                                    </div>
                                    <div className="form-group">
                                        <label>
                                            <input
                                                type="radio"
                                                name="option"
                                                value="option2"
                                                checked={selectedOption === 'option2'}
                                                onChange={handleOptionChange}
                                                onClick={() => { setVisibleB(true); setVisibleA(false) }}

                                            />
                                            DirectPay
                                        </label>
                                        {visibleB &&
                                            <div className='hide2'><p>Pay by Visa or MasterCard.</p></div>
                                        }

                                        {errors.selectedOption && <div className="error">{errors.selectedOption}</div>}
                                    </div>
                                </div>
                            </div>
                            <input type="submit" value="Continue to checkout" className="btn" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment