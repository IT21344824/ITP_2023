import { useEffect, useState } from "react";
import { getDoc, collection, query, doc, updateDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";
import "./product_banner.scss";
import Addi_nav from '../Addi_navbar/Addi_nav';
import Modal from 'react-modal';
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";


const Product_banner = () => {

    const [files, setFiles] = useState([]);
    const [per, setPer] = useState(null);


    //geting selected data
    const [data, setData] = useState({});
    const _id = "xbspKCBp2K4kwyl86GCE";

    //get data
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

    //update  img
    const handleSaveChanges = async (event) => {
        event.preventDefault();

        try {
            if (files.length > 0) {
                const file = files[0]; // Assuming only one file can be selected

                // Upload image to Firebase Storage
                const storageRef = ref(storage, `images/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file);

                // Get download URL when upload is complete
                uploadTask.on("state_changed", (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setPer(progress);
                }, (error) => {
                    console.error("Error uploading image: ", error);
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        // Update document with new image URL
                        const categoryRef = doc(collection(db, "client_home_pg"), _id);
                        await updateDoc(categoryRef, {
                            ...data,
                            img: downloadURL,
                            timeStamp: serverTimestamp(),
                        });
                        setFiles([]);
                    });
                });
            } else {
                // No new image selected, just update timestamp
                const categoryRef = doc(collection(db, "client_home_pg"), _id);
                await updateDoc(categoryRef, {
                    ...data,
                    timeStamp: serverTimestamp(),
                });
            }
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    const [isEditing, setIsEditing] = useState(false);


    return (
        <div className='product_banner'>
            <div className="datatableTitle">
                <h1> Product banner </h1>
            </div>
            <div className="banner">
                <div className="title">

                    {isEditing ? (
                        <>
                            <button className="upBtn" onClick={handleSaveChanges}>update</button>
                            <button className="Cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                        </>
                    ) : (
                        <button className="upBtn" onClick={() => setIsEditing(true)}>Edit</button>
                    )}


                    {/* <button className="upBtn" onClick={handleSaveChanges} > update </button> */}

                </div>

                {isEditing ? (
                    <div className="Up-img">
                        <label htmlFor="file">
                            Upload Image : <DriveFolderUploadIcon className="icon" />
                        </label>
                        <input
                            type="file"
                            id="file"
                            onChange={(e) => setFiles(Array.from(e.target.files))}
                            style={{ display: "none" }}
                        />
                    </div>
                ) : ('')}
                
                <div className="img">
                    <img src={data.img} alt="" />
                </div >

               
            </div>
        </div>
    )
}

export default Product_banner
