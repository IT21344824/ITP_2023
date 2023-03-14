import './CatUpdate.scss';
import React, { useState, useEffect, useRef } from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { collection, doc, updateDoc, setDoc, serverTimestamp, getDocs, onSnapshot, query, where, writeBatch, getDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const CatUpdate = ({ open, onClose, id ,Cat_name }) => {

    //---------------------------------------Product data---------------------------------
    const initialUpdateData = {
        Cat_name: "",
    };
    const [loading, setLoading] = useState(false);

    const [UpdateData, setFormData] = useState(initialUpdateData);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,

        }));

    };

    const handleReset = () => {
        setFormData(initialUpdateData);
    };

    const handleCancel = () => {
        setFormData(initialUpdateData);
        onClose();
    };

    //find cat name befro update-----------------------------------------------------------------------
    const xxxxxx = async (event) => {
        event.preventDefault();

        try {
        
            const categoryRef = doc(collection(db, "Product_Category"), id);
            const docSnap = await getDoc(categoryRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setSavedata(data); // update the state with retrieved data
            } else {
                console.log("No such document!");
            }
            console.log(savedata);
        } catch (error) {
            console.error("Error updating document: ", error);
            setLoading(false);
        }
    };

    const predata = id;
    const prename = Cat_name;
    const [savedata, setSavedata] = useState({});


    // unsubscribe from the listener when the component unmounts


    // console.log(predata)
    // console.log(prename)


    //--------------------------------------------------------------------------------

    const handleUpdate = async (event) => {
        event.preventDefault();
      
        if (!UpdateData.Cat_name) {
          alert("Please enter the Category name");
          return;
        }
      
        setLoading(true);
      
        try {
          const categoryRef = doc(collection(db, "Product_Category"), id);
      
          // Update the category document
          await updateDoc(categoryRef, {
            ...UpdateData,
            timeStamp: serverTimestamp(),
          });
      
          // Find products that need to be updated
          const prevMonthQuery = query(
            collection(db, "Products"),
            where("timeStamp", "==", prename),
           
        );


          const productsRef = collection(db, "Products");
          const q = query(productsRef, where("item_type", "==", prename));
          const querySnapshot = await getDocs(q);
      
          // Update each product with the new category name
          const batch = writeBatch(db);
          querySnapshot.forEach((doc) => {
            const productRef = doc(productsRef.doc(doc.id));
            batch.update(productRef, { item_type: UpdateData.Cat_name });
            console.log(UpdateData.Cat_name)
          });
      
          // Commit the batch to update all products
          await batch.commit();
      
          // Reset the form data
          setFormData(initialUpdateData);
          alert(`Category with ID ${id} has been updated successfully`);
          setLoading(false);
        } catch (error) {
          console.error("Error updating document: ", error);
          setLoading(false);
        }
      };
      

    //-----------------------------------------------------listen and update--------------------------------------------




    if (!open) return null;


    return (
        <div className='CatUpdate'>
            <div className="popup">
                <h1>Update Category </h1>
                <div className="full_from">
                    <form onReset={handleReset} onSubmit={handleUpdate}>
                        <div className="line_rows">
                            {/*------------------------------------------------------------------*/}

                            <div className="bot">
                                <div className="formInput">
                                    <label> Category Name: </label>
                                    <input type="text" name="Cat_name" value={UpdateData.Cat_name} onChange={handleInputChange} placeholder="Enter Category name...." />
                                </div>

                            </div>

                            <div className="buttons">
                                <button type="submit" className="submit"> Update </button>
                                <button type="reset" className="reset">  Clear </button>
                                <button onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default CatUpdate
