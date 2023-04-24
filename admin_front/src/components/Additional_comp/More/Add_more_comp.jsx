import { useEffect, useState } from "react";
import { getDoc, collection, query, doc, updateDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";
import "./Add_more_comp.scss";
import Addi_nav from '../Addi_navbar/Addi_nav';
import Modal from 'react-modal';
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
//notify-
//import NofitySuc from "../../../components/notify_status/nofity";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//--

const Add_more_comp = () => {

    //nofify--
    const notifyStyle = {
        whiteSpace: 'pre-line'
    }
    const progressStyle = {
        background: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)'
    }

    //---


    //image upload
    const [files, setFiles] = useState([]);
    const [per, setPer] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);


    //geting selected data
    const [data, setData] = useState({});
    const _id = "MorePageSlider";

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



    //pre image soom
    const [selectedImg, setSelectedImg] = useState(null);

    const handleImageClick = (index) => {
        setSelectedImg(index);
    };
    //-----------------------------
    const [isEditing, setIsEditing] = useState(false);



    const initialUpdateData = {
        M_details_id: "",
        img: [], //slider
    };

    const [UpdateData, setFormData] = useState(initialUpdateData);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,

        }));

    };

    //uploadfile
    const uploadFile = async (file) => {
        const name = new Date().getTime() + file.name;
        console.log(name);
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



    const handleSaveChanges = async (event) => {
        event.preventDefault();

        try {
            const categoryRef = doc(collection(db, "client_home_pg"), _id);


            // retrieve the current value of the img array
            const docSnap = await getDoc(categoryRef);
            const currentImgArray = docSnap?.data()?.img || [];

            // add the new image URL to the end of the array
            const newImgArray = files[0] ? [...currentImgArray, await uploadFile(files[0])] : currentImgArray;

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

             //notify
             toast.success(`Successfully update \n`);

            setIsEditing(false);
            setFormData(initialUpdateData);
            setFiles([]);
            setSelectedIndex(0);
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



    return (
        <div className='Add_more_comp'>

            {/* slider  start----------------------------------------------------------------------------------------------------------------- */}
            <div className="about_us top_pre">

                <div className="pre_title">
                    <h1>slider Details</h1>
                </div>


                <div className="pre_Img">
                    {data?.img?.map((img, index) => (
                        <div key={index} >
                            <div className="img">

                                {isEditing ? (
                                    <div>
                                        <img src={img} alt="Details" />
                                        <button className="viewBtn" onClick={() => handleImageClick(index)} >view</button>
                                        <button className="deleteBtn" onClick={() => handleDelete(index)} >Delete</button>
                                    </div>
                                ) : <img src={img} alt="Details" onClick={() => handleImageClick(index)} />}
                            </div>
                        </div>
                    ))}
                </div>

                {selectedImg !== null && (
                    <Modal
                        isOpen={true}
                        onRequestClose={() => setSelectedImg(null)}
                        appElement={document.body}
                    // style={{ content: { display: "flex", justifyContent: "center", alignItems: "center", }, }}
                    >
                        <img src={data?.img?.[selectedImg]} alt="product" />
                        <br />
                        <button onClick={() => setSelectedImg(null)} className="selct_img_cancle_buton">Close</button>

                    </Modal>
                )}


                <div className="animation_p_id">
                    <div className="p_details">
                        <div className="detail">
                            <div className="buttons">
                                {isEditing ? (
                                    <>
                                        <button className="edit" onClick={handleSaveChanges}>Save Changes</button>
                                        <button className="Cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                                    </>
                                ) : (
                                    <button className="edit" onClick={() => setIsEditing(true)}>Edit</button>
                                )}
                            </div>

                            <div>
                                {isEditing ? (
                                    <div className="update-img">
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
                                ) : ''}
                            </div>

                            <div className="p_inputbox">
                                <span className="span"> M Slider id : </span>
                                {isEditing ? (
                                    <div>
                                        <span className="hint">{data?.M_details_id ?? ''} </span>
                                        <input
                                            type="text"
                                            name="M_details_id"
                                            value={UpdateData.M_details_id}
                                            onChange={handleInputChange}
                                        />

                                    </div>
                                ) : (
                                    <p>{data?.M_details_id ?? ''}</p>
                                )}

                            </div>



                        </div>

                    </div>
                </div>
            </div>
            {/* slider  end----------------------------------------------------------------------------------------------------------------- */}


        </div>
    )
}

export default Add_more_comp
