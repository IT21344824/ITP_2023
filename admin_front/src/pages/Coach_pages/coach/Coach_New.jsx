import "./Coach_New.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useEffect, useState } from "react";
import { collection, getDocs, getDoc, addDoc, serverTimestamp, query, where, onSnapshot, doc } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Coach_New = () => {


    //image upload
    const [files, setFiles] = useState([]);
    const [per, setPer] = useState(null);
    //------------

    // category data
    const [data, setData] = useState([]);
    //------------

    // Product data
    const initialFormData = {
        Coach_id: "",
        Coach_name:"",
        contact:"",
        img: [], // add imgs to formData to store multiple image urls\
        description: "",
        
    };

    const [formData, setFormData] = useState(initialFormData);
    //------------

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
    //---------------------------Products-----------------------------------------------

    const handleInputChange = (event) => {
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


        // Initialize formData.img as an empty array if it is null
        const images = formData.img ? formData.img : [];

        try {
            // Check if a product with the same Product_id already exists
            const productsRef = collection(db, "Coaches");




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
            const newProductRef = await addDoc(collection(db, "Coaches"), {
                ...formData,
                timeStamp: serverTimestamp(),
            });
            console.log("Document written with ID: ", newProductRef.id);
            alert(`New Product have added and ID: ${newProductRef.id}`);

            setFormData(initialFormData);
            setFiles([]);
            setSelectedIndex(0); // assuming you have a setSelectedIndex function to set the index of the selected image
            setSelectedImage(null); // set the selectedImage to null
            document.getElementById("category").selectedIndex = 0;
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    // ----------------------------------------------------------------


    //-------------------------------------------------------image select popup-----------------------------------
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);


    const handleImageClick = (event) => {
        setSelectedImage(event.target.src);
    };

    const handleMiniImageClick = (event) => {
        setSelectedImage(event.target.dataset.src);
    };



    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Add New Coach</h1>
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
                            {/*------------------------------------------------------------------*/}

                            <div className="formInput img_tag">
                                <label htmlFor="file">
                                    Image : <DriveFolderUploadIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(e) => setFiles(Array.from(e.target.files))}
                                    multiple
                                    style={{ display: "none" }}
                                />
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
                            {/*------------------------------------------------------------------*/}



                            <div className="formInput">
                                <label> Coach Id </label>
                                <input
                                    type="text"
                                    name="Coach_id"
                                    value={formData.Coach_id}
                                    onChange={handleInputChange}
                                    placeholder="Enter Product Id...."
                                />
                            </div>


                            <div className="formInput">
                                <label>Coach Name</label>
                                <input
                                    type="text"
                                    name="Coach_name"
                                    value={formData.Coach_name}
                                    onChange={handleInputChange}
                                    placeholder="Enter  Coach Name...."
                                />
                            </div>

                            
                            <div className="formInput">
                                <label>contact</label>
                                <input
                                    type="text"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleInputChange}
                                    placeholder="Enter Coach contact...."
                                />
                            </div>


                            <div className="formInput">
                            <label>Description</label>
                            <textarea
                                className="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Enter Product Description...."
                            ></textarea>
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
    );
}

export default Coach_New
