import { useEffect, useState } from "react";
import { getDoc, collection, query, doc, updateDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";
import "./AboutUs.scss";
import Addi_nav from '../../Addi_navbar/Addi_nav';
import Modal from 'react-modal';
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
//notify-
//import NofitySuc from "../../../components/notify_status/nofity";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//--

const AboutUs = () => {

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
    const _id = "MorePageAboutUs";

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

    const handleImageClick = () => {
        setSelectedImg(true);
    };
    //-----------------------------
    const [isEditing, setIsEditing] = useState(false);



    const initialUpdateData = {
        M_details_id: "",
        AU_title: "",
        AU_descrip: "",
        AU_address: "",
        AU_phone: "",
        AU_email: "",
        AU_facebook: "",
        AU_insta: "",
        AU_twitter: "",
        img: "",
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

            // retrieve the current value of the img
            const docSnap = await getDoc(categoryRef);
            const currentImg = docSnap?.data()?.img;

            // upload the new image file and create a new value with it
            const newImg = files[0] ? await uploadFile(files[0]) : currentImg;

            // update the img array with the new value
            const updateData = {
                ...UpdateData,
                timeStamp: serverTimestamp(),
                img: newImg,
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




    return (
        <div className='AboutUs'>
            {/* about us start----------------------------------------------------------------------------------------------------------------- */}
            <div className="about_us top_pre">

                <div className="pre_title">
                    <h1>About us Details</h1>
                </div>


                <div className="pre_Img">
                    <div className="img">
                        <img src={data.img} alt="aboutUs-img" onClick={handleImageClick} />
                    </div>
                </div>

                {selectedImg !== null && (
                    <Modal
                        isOpen={true}
                        onRequestClose={() => setSelectedImg(null)}
                        appElement={document.body}
                    // style={{ content: { display: "flex", justifyContent: "center", alignItems: "center", }, }}
                    >
                        <img src={data.img} alt="aboutUs-img" />
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
                                            Update Image : <DriveFolderUploadIcon className="icon" />
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



                            <div className="center">

                                <div className="p_inputbox">
                                    <span className="span"> About Us id : </span>
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

                                <div className="p_inputbox">
                                    <span className="span"> AU_title : </span>
                                    {isEditing ? (
                                        <div>
                                            <span className="hint">{data?.AU_title ?? ''} </span>
                                            <input
                                                type="text"
                                                name="AU_title"
                                                value={UpdateData.AU_title}
                                                onChange={handleInputChange}
                                            />

                                        </div>
                                    ) : (
                                        <p>{data?.AU_title ?? ''}</p>
                                    )}

                                </div>
                                <div className="p_inputbox">
                                    <span className="span"> Address : </span>
                                    {isEditing ? (
                                        <div>
                                            <span className="hint">{data?.AU_address ?? ''} </span>
                                            <input
                                                type="text"
                                                name="AU_address"
                                                value={UpdateData.AU_address}
                                                onChange={handleInputChange}
                                            />

                                        </div>
                                    ) : (
                                        <p>{data?.AU_address ?? ''}</p>
                                    )}

                                </div>
                                <div className="p_inputbox">
                                    <span className="span"> Phone : </span>
                                    {isEditing ? (
                                        <div>
                                            <span className="hint">{data?.AU_phone ?? ''} </span>
                                            <input
                                                type="text"
                                                name="AU_phone"
                                                value={UpdateData.AU_phone}
                                                onChange={handleInputChange}
                                            />

                                        </div>
                                    ) : (
                                        <p>{data?.AU_phone ?? ''}</p>
                                    )}

                                </div>
                                <div className="p_inputbox">
                                    <span className="span"> Email : </span>
                                    {isEditing ? (
                                        <div>
                                            <span className="hint">{data?.AU_email ?? ''} </span>
                                            <input
                                                type="text"
                                                name="AU_email"
                                                value={UpdateData.AU_email}
                                                onChange={handleInputChange}
                                            />

                                        </div>
                                    ) : (
                                        <p>{data?.AU_email ?? ''}</p>
                                    )}

                                </div>
                                <div className="p_inputbox">
                                    <span className="span"> Facebook : </span>
                                    {isEditing ? (
                                        <div>
                                            <span className="hint">{data?.AU_facebook ?? ''} </span>
                                            <input
                                                type="text"
                                                name="AU_facebook"
                                                value={UpdateData.AU_facebook}
                                                onChange={handleInputChange}
                                            />

                                        </div>
                                    ) : (
                                        <p>{data?.AU_facebook ?? ''}</p>
                                    )}

                                </div>
                                <div className="p_inputbox">
                                    <span className="span"> Instagram : </span>
                                    {isEditing ? (
                                        <div>
                                            <span className="hint">{data?.AU_insta ?? ''} </span>
                                            <input
                                                type="text"
                                                name="AU_insta"
                                                value={UpdateData.AU_insta}
                                                onChange={handleInputChange}
                                            />

                                        </div>
                                    ) : (
                                        <p>{data?.AU_insta ?? ''}</p>
                                    )}

                                </div>
                                <div className="p_inputbox">
                                    <span className="span"> twitter : </span>
                                    {isEditing ? (
                                        <div>
                                            <span className="hint">{data?.AU_twitter ?? ''} </span>
                                            <input
                                                type="text"
                                                name="AU_twitter"
                                                value={UpdateData.AU_twitter}
                                                onChange={handleInputChange}
                                            />

                                        </div>
                                    ) : (
                                        <p>{data?.AU_twitter ?? ''}</p>
                                    )}

                                </div>
                                <div className="p_inputbox">
                                    <span className="span"> AU_descrip : </span>
                                    {isEditing ? (
                                        <div>
                                            <span className="hint_Descrip">{data?.AU_descrip ?? ''} </span>
                                            <textarea
                                                name="AU_descrip"
                                                type="text"
                                                value={UpdateData.AU_descrip}
                                                onChange={handleInputChange}
                                            />

                                        </div>
                                    ) : (
                                        <p>{data?.AU_descrip ?? ''}</p>
                                    )}

                                </div>


                            </div>


                        </div>

                    </div>
                </div>
            </div>
            {/* about us end----------------------------------------------------------------------------------------------------------------- */}

        </div>
    )
}

export default AboutUs
