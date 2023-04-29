import { useEffect, useState } from "react";
import { getDoc, collection, query, doc, updateDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useLocation } from "react-router-dom";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

import "./Package_view.scss";

const Package_view = () => {

    //geting id from http
    const location = useLocation();
    const _id = location.state?.id;

    //geting selected data
    const [data, setData] = useState({});
    console.log(data.img);


    useEffect(() => {
        if (_id) {
            const docRef = doc(db, "Packages", _id);

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
        }
    }, [_id]);


    const [files, setFiles] = useState([]);
    const [per, setPer] = useState(null);

    //update  img
    //uploadfile
    const uploadFile = async (file) => {
        const name = new Date().getTime() + file.name;

        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    setPer(progress);
                },
                (error) => {
                    console.log(error);
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };
    const initialUpdateData = {
       img: [],
    };

    const [UpdateData, setFormData] = useState(initialUpdateData);


    //edit changes
    const handleSaveChanges = async (event) => {
        event.preventDefault();

        try {
            const categoryRef = doc(collection(db, "Packages"), _id);

            // retrieve the current value of the img array
            const docSnap = await getDoc(categoryRef);
            const currentImgArray = docSnap.data().img;

            // add the new image 
            const newImgArray = files[0] ? [await uploadFile(files[0])] : currentImgArray;

            // update the img array with the new value
            const updateData = {
                ...UpdateData,
                timeStamp: serverTimestamp(),
                img: newImgArray,
            };

            // don't update any fields with empty strings
            const cleanData = {};
            Object.entries(updateData).forEach(([key, value]) => {
                if (value !== "") {
                    cleanData[key] = value;
                }
            });

            // Check that all field names are valid
            Object.keys(cleanData).forEach((key) => {
                if (key.startsWith(".") || key.endsWith(".") || key.includes("..")) {
                    throw new Error(`Invalid field name: ${key}`);
                }
            });

            // Update the category document with only non-empty fields
            await updateDoc(categoryRef, cleanData);

            setIsEditing(false);
            setFormData(initialUpdateData);
            setFiles([]);
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    //delete selected img
    const handleDelete = async (index) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this image?");
        if (confirmDelete) {
            try {
                const categoryRef = doc(collection(db, "client_home_pg"), _id);

                // retrieve the current value of the img array
                const docSnap = await getDoc(categoryRef);
                const currentImgArray = docSnap.data().img;

                // create a copy of the data object and remove the selected image from the img array
                const newData = { ...data };
                newData.img.splice(index, 1);

                // update the client_home_pg document with the new data object
                await updateDoc(categoryRef, { img: newData.img });

                setData(newData);
            } catch (error) {
                console.error("Error deleting image: ", error);
            }
        }
    };


    const [isEditing, setIsEditing] = useState(false);


    return (
        <div className='Package_view'>
            <Sidebar />
            <div className="con">
                <Navbar />

                <div className="p_container">
                    <div className="Pa_delail">

                        {isEditing ? (
                            <>

                                <button className="upBtn" onClick={handleSaveChanges}>Save Changes</button>
                                <button className="p_Cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                            </>
                        ) : (
                            <button className="EditBtn" onClick={() => setIsEditing(true)}>Edit</button>
                        )}

                        <div className="p_Img">
                            {data?.img?.map((img, index) => (
                                <div key={index} >
                                    <div className="img">
                                        {isEditing ? (
                                            <div>
                                                <img src={img} alt="Details" />

                                                <button className="deleteBtn" onClick={() => handleDelete(index)} >Delete</button>

                                            </div>
                                        ) : (
                                            <img src={img} alt="Details" />
                                        )}
                                    </div>
                                </div>
                            ))}

                        </div>

                        {isEditing ? (
                            <>
                                <label htmlFor="file">
                                    Upload Image : <DriveFolderUploadIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(e) => setFiles(Array.from(e.target.files))}
                                    style={{ display: "none" }}
                                />
                            </>
                        ) : (
                            ''
                        )}

                        <div className="pa_inputbox">
                            <p>{data?.Product_id ?? ''}</p>
                            <span> Product_id </span>
                        </div>

                        <div className="pa_inputbox">
                            <p>{data?.Categories ?? ''}</p>
                            <span> Categories </span>
                        </div>




                    </div>
                </div>

              
            </div>
        </div>
    )
}

export default Package_view
