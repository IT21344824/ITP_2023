import React from 'react'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../../navbar/Navbar";
import Sidebar from "../../../sidebar/Sidebar";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { collection, getDocs, getDoc, addDoc, serverTimestamp, query, where, onSnapshot, doc } from "firebase/firestore";
import { db, storage } from "../../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./Home_New.scss";
//notify-
//import NofitySuc from "../../../components/notify_status/nofity";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//--


const Home_New = () => {

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

    const handleMiniImageClick = (event) => {
        setSelectedImage(event.target.dataset.src);
    };

    //------------

    //-------error massage------
    const [ShowHint, setShowHint] = useState(false);



    // details item
    const initialFormData = {
        details_id: "",
        LP_description: "",
        TP_description: "",
        img: [], // add imgs to formData to store multiple image urls
    };

    const [formData, setFormData] = useState(initialFormData);

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

    //---------------------------details item-----------------------------------------------

    const handleInputChange = (event) => {
        setShowHint(false);
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });


    };


    const handleReset = () => {
        setFormData(initialFormData);
        setFiles([]);
        setSelectedIndex(0); // assuming you have a setSelectedIndex function to set the index of the selected image
        setSelectedImage(null); // set the selectedImage to null

    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        let hasError = false;

        if (!formData.details_id) {
            setShowHint(true);
            hasError = true;
            toast.warn('Please enter the details_id!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        if (!formData.LP_description) {
            //alert("Please enter the description");
            setShowHint(true);
            hasError = true;
            toast.warn('Please enter the LP_description!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        if (!formData.TP_description) {
            //alert("Please enter the description");
            setShowHint(true);
            hasError = true;
            toast.warn('Please enter the TP_description!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        if (files.length === 0) {
            //alert("Please select an image");
            setShowHint(true);
            hasError = true;
            toast.warn('Please enter the image!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        if (hasError) {
            return;
        }

        // Initialize formData.img as an empty array if it is null
        const images = formData.img ? formData.img : [];

        try {
            // Check if a product with the same details_id already exists
            const productsRef = collection(db, "client_home_pg");
            const queryRef = query(productsRef, where("details_id", "==", formData.details_id));

            const querySnapshot = await getDocs(queryRef);
            if (querySnapshot.size > 0) {
                //alert("details_id already exists in the database");
                toast.error('details_id already exists in the database!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                return;
            }

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

            // Add the details data to the database
            const newProductRef = await addDoc(collection(db, "client_home_pg"), {
                ...formData,
                timeStamp: serverTimestamp(),
            });
            console.log("Document written with ID: ", newProductRef.id);

            //nofity
            toast.success(`Successful \nID: ${newProductRef.id}`, {
                background: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)',
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setFormData(initialFormData);
            setFiles([]);
            setSelectedIndex(0); // assuming you have a setSelectedIndex function to set the index of the selected image
            setSelectedImage(null); // set the selectedImage to null
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };



    return (
        <div className='Home_comp_new'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="contaiber">
                    <div className="top">
                        <h1>Add New Details to client home page</h1>
                    </div>

                    <div className="bottom">
                        <div className="left">
                            <div className="selected-image-container">
                                {selectedImage ? (
                                    <img
                                        src={selectedImage}
                                        alt=""
                                        className="selected-image"
                                    />
                                ) : (
                                    <div className="placeholder-image"></div>
                                )}
                            </div>
                            <div className="mini-image-container">
                                {files.length > 0 ? (
                                    files.map((file, index) => (
                                        <img
                                            key={file.name}
                                            src={URL.createObjectURL(file)}
                                            alt=""
                                            data-src={URL.createObjectURL(file)}
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                marginBottom: "10px",
                                                borderRadius: "25%",
                                                objectFit: "cover",
                                                border: selectedImage === URL.createObjectURL(file) ? "5px solid blue" : "5px solid #777474",
                                                cursor: "pointer"
                                            }}
                                            onClick={handleMiniImageClick}
                                        />
                                    ))
                                ) : (
                                    <img
                                        src="/no-image-icon-0.jpg"
                                        alt=""
                                    />
                                )}
                            </div>
                        </div>

                        <div className="right">
                            <form onSubmit={handleSubmit} onReset={handleReset}  >
                                {/*------------------------------------------------------------------*/}                                    <div className="formInput img_tag">
                                    <div>
                                        <label htmlFor="file">
                                            Banner Image : <DriveFolderUploadIcon className="icon" />
                                        </label>
                                        <input
                                            type="file"
                                            id="file"
                                            onChange={(e) => setFiles(Array.from(e.target.files))}
                                            multiple
                                            style={{ display: "none" }}
                                            className={ShowHint && (files.length === 0) ? 'error' : ''}
                                        />
                                        {ShowHint && (files.length === 0) && (
                                            <div className="p_new_hint img_hint" >
                                                Please enter the Product Id!
                                            </div>
                                        )}

                                        <button onClick={(event) => {
                                            event.preventDefault();
                                            setFormData({
                                                ...formData,
                                                img: []
                                            });
                                            setFiles([]);
                                            setSelectedIndex(0); // assuming you have a setSelectedIndex function to set the index of the selected image
                                            setSelectedImage(null); // set the selectedImage to null
                                        }} className="clear_img"> clear </button>
                                    </div>

                                </div>
                                {/*------------------------------------------------------------------*/}
                                <div className="xx"></div>
                                <div className={`formInput ${ShowHint ? 'error' : ''}`}>
                                    <label> details Id : </label>
                                    <input
                                        type="text"
                                        name="details_id"
                                        value={formData.details_id}
                                        onChange={handleInputChange}
                                        placeholder="Enter details Id...."
                                        //required
                                        // add a class to the input when ShowHint is true
                                        className={ShowHint && !formData.details_id ? 'error' : ''}
                                    />
                                    {ShowHint && !formData.details_id && (
                                        <div className="p_new_hint" >
                                            Please enter the Product Id!
                                        </div>
                                    )}
                                </div>




                                <div className=" top_Margin formInput">
                                    <label> Latest Product Description </label>
                                    <textarea
                                        className={`Description ${ShowHint && !formData.LP_description ? 'error' : ''}`}
                                        name="LP_description"
                                        value={formData.LP_description}
                                        onChange={handleInputChange}
                                        placeholder="Enter Product Description...."
                                    ></textarea>
                                    {ShowHint && !formData.LP_description && (
                                        <div className="p_new_hint" >
                                            Please enter Description !
                                        </div>
                                    )}
                                </div>

                                <div className=" top_Margin formInput">
                                    <label> Training Programs Description </label>
                                    <textarea
                                        className={`Description ${ShowHint && !formData.TP_description ? 'error' : ''}`}
                                        name="TP_description"
                                        value={formData.TP_description}
                                        onChange={handleInputChange}
                                        placeholder="Enter Product Description...."
                                    ></textarea>
                                    {ShowHint && !formData.TP_description && (
                                        <div className="p_new_hint" >
                                            Please enter Description !
                                        </div>
                                    )}

                                </div>
                                <div className="formButton">
                                    <button disabled={per !== null && per < 100} type="submit" className="submit" >Add Stock</button>
                                    <button type="reset" className="reset" > Clear </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                limit={6} //-
                hideProgressBar={false}
                newestOnTop={false} //-
                closeOnClick
                rtl={false} //--
                pauseOnFocusLoss //--
                draggable
                pauseOnHover
                theme="colored"
                style={notifyStyle}
            />
        </div>
    )
}

export default Home_New
