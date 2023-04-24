import React from 'react'
import { useState , useEffect } from 'react';
import './DirectP.scss'
import { collection, getDocs, getDoc, addDoc, serverTimestamp, query, where, onSnapshot, doc } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';


const DirectP = () => {
  const [depositAmount, setDepositAmount] = useState('');
  const [depositDate, setDepositDate] = useState('');
  const [bank, setBank] = useState('');
  const [branch, setBranch] = useState('');
  const [refNo, setRefNo] = useState('');
  const [image, setImage] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!depositAmount) {
      errors.depositAmount = 'Please enter a deposit amount';
      isValid = false;
    }

    if (!depositDate) {
      errors.depositDate = 'Please select a deposit date';
      isValid = false;
    }

    if (!bank) {
      errors.bank = 'Please enter the name of the bank';
      isValid = false;
    }

    if (!branch) {
      errors.branch = 'Please enter the name of the branch';
      isValid = false;
    }

    if (!refNo) {
      errors.refNo = 'Please enter a reference number';
      isValid = false;
    }

    

    setFormErrors(errors);

    return isValid;
  };


  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(bank)
    if (validateForm()) {
      // Handle submission logic here
    }
    try {
      // Check if a product with the same Product_id already exists
      const productsRef = collection(db, "payment");

      // Add the package data to the database
      const newProductRef = await addDoc(collection(db, "payment"), {
        depositAmount,depositDate,bank,branch,refNo,image,formErrors,

          timeStamp: serverTimestamp(),
      });
      alert(`added and ID:`);
      navigate("/OrderDSuccess");
      //setFormData(initialFormData);
      // setFiles([]);
    
  } catch (error) {
      console.error("Error adding document: ", error);
  }
  };
  return (
    <div className="directPay">
    <div class="bPay-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="deposit-amount">Deposit Amount (Rs.):</label>
        <input type="number" id="deposit-amount" placeholder="1500.00" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} />
        {formErrors.depositAmount && <span className="error">{formErrors.depositAmount}</span>}

        <label htmlFor="deposit-date">Deposit Date:</label>
        <input type="date" id="deposit-date" value={depositDate} onChange={(e) => setDepositDate(e.target.value)} />
        {formErrors.depositDate && <span className="error">{formErrors.depositDate}</span>}

        <label htmlFor="bank">Bank:</label>
        <input type="text" id="bank" placeholder="BOC" value={bank} onChange={(e) => setBank(e.target.value)} />
        {formErrors.bank && <span className="error">{formErrors.bank}</span>}

        <label htmlFor="branch">Branch:</label>
        <input type="text" id="branch" placeholder="Kandy" value={branch} onChange={(e) => setBranch(e.target.value)} />
        {formErrors.branch && <span className="error">{formErrors.branch}</span>}

        <label htmlFor="ref-no">Ref No:</label>
        <input type="text" id="ref-no" placeholder="562334" value={refNo} onChange={(e) => setRefNo(e.target.value)} />
        {formErrors.refNo && <span className="error">{formErrors.refNo}</span>}

        <label htmlFor="image">Upload Image:</label>
        <input type="file" id="image" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        {formErrors.image && <span className="error">{formErrors.image}</span>}
        
        <button type="submit">Submit</button>
       
      </form>
    </div>
    </div>
  )
}

export default DirectP
