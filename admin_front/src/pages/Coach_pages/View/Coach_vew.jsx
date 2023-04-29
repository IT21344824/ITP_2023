import { useEffect, useState } from "react";
import { getDoc, collection, query, doc, updateDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useLocation } from "react-router-dom";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import "./Coach_vew.scss";

const Coach_vew = () => {

    //image upload
    const [files, setFiles] = useState([]);
    const [per, setPer] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    //geting id from http
    const location = useLocation();
    const _id = location.state?.id;

    //geting selected data
    const [data, setData] = useState({});
    console.log(data.img);

    //get data
    useEffect(() => {
        if (_id) {
            const docRef = doc(db, "Coaches", _id);

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

    //-------------------------editing---------------------------------
    //pre image soom
    const [selectedImg, setSelectedImg] = useState(null);

    const handleImageClick = (index) => {
        setSelectedImg(index);
    };

    const [isEditing, setIsEditing] = useState(false);

    const initialUpdateData = {
        Coach_id: "",
        Coach_name: "",
        contact: "",
        description: "",
        img: [],
    };

    const [UpdateData, setFormData] = useState(initialUpdateData);

    //input changes
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


    //edit changes
    const handleSaveChanges = async (event) => {
        event.preventDefault();

        try {
            const categoryRef = doc(collection(db, "Coaches"), _id);

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
            setSelectedIndex(0);
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };


    return (
        <div className="Coach_vew">
            <Sidebar />
            <div className="con">
                <Navbar />

                <div className="C_container">
                    <div className="C_delail">


                        <div className="buttons">
                            {isEditing ? (
                                <>
                                    <button className="E_edit" onClick={handleSaveChanges}>Save Changes</button>
                                    <button className="C_Cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                                </>
                            ) : (
                                <button className="editbtn" onClick={() => setIsEditing(true)}>Edit</button>
                            )}
                        </div>

                        {isEditing ? (
                            <div>
                                <img src={data.img} alt="" style={{ height: "300px" }} />
                            </div>
                        ) : (
                            < img src={data.img} alt="" style={{ height: "300px" }} />
                        )}

                        <div className="C_Img">

                            <div className="img">
                                {isEditing ? (
                                    <div>

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

                        </div>

                        <div className="C_inputbox">
                            <span> Coach_id </span>

                            <p>{data?.Coach_id ?? ''}</p>


                        </div>

                        <div className="C_inputbox">
                            <span> Coach_name </span>
                            {isEditing ? (
                                <div>
                                    <span className="hint">{data?.Coach_name ?? ''} </span>
                                    <input
                                        type="text"
                                        name="Coach_name"
                                        value={UpdateData.Coach_name}
                                        onChange={handleInputChange}
                                    />

                                </div>
                            ) : (
                                <p>{data?.Coach_name ?? ''}</p>
                            )}
                        </div>

                        <div className="C_inputbox">
                            <span> contact </span>
                            {isEditing ? (
                                <div>
                                    <span className="hint">{data?.contact ?? ''} </span>
                                    <input
                                        type="text"
                                        name="contact"
                                        value={UpdateData.contact}
                                        onChange={handleInputChange}
                                    />

                                </div>
                            ) : (
                                <p>{data?.contact ?? ''}</p>
                            )}
                        </div>

                        <div className="C_inputbox">
                            <span> description </span>
                            {isEditing ? (
                                <div>
                                    <span className="hint">{data?.description ?? ''} </span>
                                    <input
                                        type="text"
                                        name="description"
                                        value={UpdateData.description}
                                        onChange={handleInputChange}
                                    />

                                </div>
                            ) : (
                                <p>{data?.description ?? ''}</p>
                            )}
                        </div>


                    </div>
                </div>

            </div>
        </div>
    )
}

export default Coach_vew
