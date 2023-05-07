import "./User_New.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { useEffect, useState } from "react";
import { addDoc, collection, doc, serverTimestamp, setDoc , updateDoc} from "firebase/firestore";
import { auth, db, storage } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";


const User_new = ({ inputs, title }) => {
    const [file, setFile] = useState("");
    const [data, setData] = useState({});
    const [per, setPer] = useState(null);
    const navigate = useNavigate

    useEffect(() => {
        const uploadFile = () => {

            const name = new Date().getTime() + file.name
            console.log(name)
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {

                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setPer(progress)
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            break;
                    }
                },

                (error) => {
                    console.log(error)
                },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setData((prev) => ({ ...prev, img: downloadURL }))
                    });
                }
            );

        }
        file && uploadFile();
    }, [file])

    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setData({ ...data, [id]: value });
    };

    const handleAdd = async (e) => {
        e.preventDefault()

        if (!data.email) {
            // handle error or display message to user
            alert("Please Enter your  email.");
            return;
        }

        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            // Add a new document in collection "users"
            await setDoc(doc(db, "Users", res.user.uid), {
                ...data,
                address: "",
                age: "",
                img: [],
                phone: "",
                gender: "",
                role: "user",
                timeStamp: serverTimestamp()
            });

            // Create a new cart and associate it with the user
            const cartRef = collection(db, "cart");
            const newCartDoc = await addDoc(cartRef, { uid: res.user.uid, Total: 0, items: []  });
            const cartId = newCartDoc.id;
            await updateDoc(doc(db, "Users", res.user.uid), { cartId });

            const config = {
                //url:process.env.React_App_Register_url,
                handleCodeInApp: true,
            };

            //navigate(-1)
            console.log("Document written with ID: ", res.user.uid);
            // navigate to a success page
            alert("add successs.");
            navigate("/success");
        } catch (error) {
            console.log(error)
            // display error message to user
            // setError("There was an error creating your account. Please try again.");
        }


    };

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                file
                                    ? URL.createObjectURL(file)
                                    : "/no-image-icon-0.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form onSubmit={handleAdd}>
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image : <DriveFolderUploadIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </div>

                            {inputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.lable}</label>
                                    <input
                                        id={input.id}
                                        type={input.type}
                                        placeholder={input.placeholder}
                                        onChange={handleInput}


                                    />
                                </div>
                            ))}
                            <button disabled={per !== null && per < 100} type="submit" className="submitbtn">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User_new;