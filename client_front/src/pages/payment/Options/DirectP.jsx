import React from 'react'
import { useState, useEffect } from 'react';
import './DirectP.scss'
import { collection, getDocs, getDoc, addDoc, serverTimestamp, query, where, onSnapshot, doc } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, useLocation } from 'react-router-dom';


const DirectP = () => {

  //image upload
  const [files, setFiles] = useState([]);
  const [per, setPer] = useState(null);

  const [image, setImage] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  //  data
  const initialFormData = {
    depositAmount: "",
    depositDate: "",
    bank: "",
    branch: "",
    refNo: "",
    img: [], // add imgs to formData to store multiple image urls
  };

  //uploadfile
  useEffect(() => {
    const uploadFile = async () => {
      for (const file of files) {
        const name = new Date().getTime() + file.name;
        console.log(name);
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) *
                100;
              console.log("Upload is " + progress + "% done");
              setPer(progress);
            },
            (error) => {
              console.log(error);
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(
                (downloadURL) => {
                  setFormData((prev) => ({
                    ...prev,
                    img: [
                      ...(prev.img || []),
                      downloadURL,
                    ],
                  }));
                }
              );
              resolve();
            }
          );
        });
      }
    };
    files && uploadFile();
  }, [files])

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const location = useLocation();
  const oldformData = location.state;


  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.depositAmount) {
      errors.depositAmount = 'Please enter a deposit amount';
      isValid = false;
    }

    if (!formData.depositDate) {
      errors.depositDate = 'Please select a deposit date';
      isValid = false;
    }

    if (!formData.bank) {
      errors.bank = 'Please enter the name of the bank';
      isValid = false;
    }

    if (!formData.branch) {
      errors.branch = 'Please enter the name of the branch';
      isValid = false;
    }

    if (!formData.refNo) {
      errors.refNo = 'Please enter a reference number';
      isValid = false;
    }



    setFormErrors(errors);

    return isValid;
  };


  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Handle submission logic here
    }

    // Initialize formData.img as an empty array if it is null
    const images = formData.img ? formData.img : [];

    try {

      // Check if a product with the same Product_id already exists
      const productsRef = collection(db, "payment");

      // Upload each file in the files array
      for (const file of files) {
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            setPer(progress);
          },
          (error) => {
            console.log(error);
          },
          () => {
            // Get the download URL and add it to the images array
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              images.push(downloadURL);
              setFormData((prev) => ({ ...prev, img: images }));
            });
          }
        );
      }

      // Add the package data to the database
      const newProductRef = await addDoc(collection(db, "payment"), {
        ...formData, oldformData,
        timeStamp: serverTimestamp(),
      });

      console.log(formData)
      alert(`added and ID:${newProductRef.id}`);
      navigate("/OrderDSuccess");
      //setFormData(initialFormData);
      // setFiles([]);

    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  return (
    <div className="directPay">
      <div className="formcontainer">
        <div class="bPay-container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="deposit-amount">Deposit Amount (Rs.):</label>
            <input
              type="number"
              name="depositAmount"
              id="deposit-amount"
              placeholder="1500.00"
              value={formData.depositAmount}
              onChange={handleInputChange}
            />
            {formErrors.depositAmount &&
              <span className="error">{formErrors.depositAmount}</span>}

            <label htmlFor="deposit-date">Deposit Date:</label>
            <input
              type="date"
              name="depositDate"
              id="deposit-date"
              value={formData.depositDate}
              onChange={handleInputChange}
            />
            {formErrors.depositDate &&
              <span className="error">{formErrors.depositDate}</span>}

            <label htmlFor="bank">Bank:</label>
            <input
              type="text"
              id="bank"
              name="bank"
              placeholder="BOC"
              value={formData.bank}
              onChange={handleInputChange}
            />
            {formErrors.bank &&
              <span className="error">{formErrors.bank}</span>}

            <label htmlFor="branch">Branch:</label>
            <input
              type="text"
              id="branch"
              name="branch"
              placeholder="Kandy"
              value={formData.branch}
              onChange={handleInputChange}
            />
            {formErrors.branch &&
              <span className="error">{formErrors.branch}</span>}

            <label htmlFor="ref-no">Ref No:</label>
            <input
              type="text"
              id="ref-no"
              name="refNo"
              placeholder="562334"
              value={formData.refNo}
              onChange={handleInputChange}
            />
            {formErrors.refNo &&
              <span className="error">{formErrors.refNo}</span>}

            <label htmlFor="image">Upload Image:</label>

            <input
              type="file"
              id="file"
              onChange={(e) => setFiles(Array.from(e.target.files))}
              multiple

            />
            {formErrors.image &&
              <span className="error">{formErrors.image}</span>}

            <button type="submit">Submit</button>

          </form>
        </div>
      </div>

    </div>
  )
}

export default DirectP
