import { useEffect, useState } from "react";
import { getDoc, collection, query, doc, updateDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateEmail } from "firebase/auth";
import Modal from 'react-modal';
import {auth , db, storage } from "../../firebase";
import "./Profile.scss"
import { useNavigate, useLocation } from 'react-router-dom';
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
//notify-
//import NofitySuc from "../../../components/notify_status/nofity";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//--

const Profile = () => {

    //get uid
    const userObj = JSON.parse(localStorage.getItem('userClient'));
    const uid = userObj ? userObj.uid : null;

    //get details--------------------------------------------------

    //image upload
    const [files, setFiles] = useState([]);
    const [per, setPer] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [data, setData] = useState({});


    //get data
    useEffect(() => {
        const docRef = doc(db, "Users", uid);

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
    }, [uid]);



    //pre image soom
    const [selectedImg, setSelectedImg] = useState(null);

    const handleImageClick = () => {
        setSelectedImg(true);
    };
    //-----------------------------
    const [isEditing, setIsEditing] = useState(false);



    const initialUpdateData = {
        username: "",
        password: "",
        email: "",
        address: "",
        age: "",
        img: "",
        phone: "",
        gender: "",

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
            const userRef = doc(db, "Users", uid);
    
            // retrieve the current user data
            const docSnap = await getDoc(userRef);
            const userData = docSnap.data();
    
            // retrieve the current value of the img
            const currentImg = userData.img;
    
            // upload the new image file and create a new value with it
            const newImg = files[0] ? await uploadFile(files[0]) : currentImg;
    
            // update the user data with the new values
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
    
            // Update the user document with only non-empty fields
            await updateDoc(userRef, cleanData);
    
            // Update the user's email if it has changed
            if (cleanData.email && cleanData.email !== userData.email) {
                await updateEmail(auth.currentUser, cleanData.email);
            }
    
            //notify
            toast.success(`Successfully update \n`);
    
            setIsEditing(false)
            setFormData(initialUpdateData);
            setFiles([]);
            setSelectedIndex(0);
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };
    





    return (
        <div className='clentProfile'>

            <div className="container">

                <div className="pre_title">
                    <div className="protag" > Profile Details </div>
                </div>

                <div className="pre_Img">
                    <div className="img">
                        <img src={data.img} alt="profile img" onClick={handleImageClick} />
                    </div>
                </div>
                {selectedImg !== null && (
                    <Modal
                        isOpen={true}
                        onRequestClose={() => setSelectedImg(null)}
                        appElement={document.body}
                    // style={{ content: { display: "flex", justifyContent: "center", alignItems: "center", }, }}
                    >
                        <img src={data.img} alt="apply-form-img" />
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


                            <div className="center">

                                <div className="p_inputbox">
                                    <span className="span"> username : </span>
                                    {isEditing ? (
                                        <div>
                                            <span className="hint">{data?.username ?? ''} </span>
                                            <input
                                                type="text"
                                                name="username"
                                                value={UpdateData.username}
                                                onChange={handleInputChange}
                                            />

                                        </div>
                                    ) : (
                                        <p>{data?.username ?? ''}</p>
                                    )}

                                </div>

                                <div className="p_inputbox">
                                    <span className="span"> password : </span>
                                    {isEditing ? (
                                        <div>
                                            <span className="hint">{data?.password ?? ''} </span>
                                            <input
                                                type="text"
                                                name="password"
                                                value={UpdateData.password}
                                                onChange={handleInputChange}
                                            />

                                        </div>
                                    ) : (
                                        <p>{data?.password ?? ''}</p>
                                    )}

                                </div>

                                <div className="p_inputbox">
                                    <span className="span"> email : </span>
                                    {isEditing ? (
                                        <div>
                                            <span className="hint">{data?.email ?? ''} </span>
                                            <input
                                                type="text"
                                                name="email"
                                                value={UpdateData.email}
                                                onChange={handleInputChange}
                                            />

                                        </div>
                                    ) : (
                                        <p>{data?.email ?? ''}</p>
                                    )}

                                </div>

                                <div className="p_inputbox">
                                    <span className="span"> address : </span>
                                    {isEditing ? (
                                        <div>
                                            <span className="hint">{data?.address ?? ''} </span>
                                            <input
                                                type="text"
                                                name="address"
                                                value={UpdateData.address}
                                                onChange={handleInputChange}
                                            />

                                        </div>
                                    ) : (
                                        <p>{data?.address ?? ''}</p>
                                    )}

                                </div>

                                <div className="p_inputbox">
                                    <span className="span"> age : </span>
                                    {isEditing ? (
                                        <div>
                                            <span className="hint">{data?.age ?? ''} </span>
                                            <input
                                                type="text"
                                                name="age"
                                                value={UpdateData.age}
                                                onChange={handleInputChange}
                                            />

                                        </div>
                                    ) : (
                                        <p>{data?.age ?? ''}</p>
                                    )}

                                </div>

                               
                                <div className="p_inputbox">
                                    <span className="span"> phone : </span>
                                    {isEditing ? (
                                        <div>
                                            <span className="hint">{data?.phone ?? ''} </span>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={UpdateData.phone}
                                                onChange={handleInputChange}
                                            />

                                        </div>
                                    ) : (
                                        <p>{data?.phone ?? ''}</p>
                                    )}

                                </div>

                                <div className="p_inputbox">
                                    <span className="span"> gender : </span>
                                    {isEditing ? (
                                        <div>
                                            <span className="hint">{data?.gender ?? ''} </span>
                                            <input
                                                type="text"
                                                name="gender"
                                                value={UpdateData.gender}
                                                onChange={handleInputChange}
                                            />

                                        </div>
                                    ) : (
                                        <p>{data?.gender ?? ''}</p>
                                    )}

                                </div>


                               

                            </div>


                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile
