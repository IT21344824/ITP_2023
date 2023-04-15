import { useEffect, useState } from "react";
import { getDoc, collection, query, doc, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useLocation } from "react-router-dom";

const Employe = ({ id }) => {

    //geting id from http
    const location = useLocation();
    const _id = location.state?.id;


    //geting selected data
    const [data, setData] = useState({});
    console.log(data.img);

    useEffect(() => {
        if (_id) {
            const docRef = doc(db, "Users", _id);

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


    return (
        <div>
            <div className="delail">
                <div className="pre_Img">
                <img src={data?.img??'' } alt="product" style={{ height: "300px" }}/>

                </div>
                

                <div className="p_inputbox">
                    <p>{data?.address ?? ''}</p>
                    <span> address </span>
                </div>

                <div className="p_inputbox">
                    <p>{data?.phone ?? ''}</p>
                    <span> phone </span>
                </div>

                <div className="p_inputbox">
                    <p>{data?.gender ?? ''}</p>
                    <span> gender </span>
                </div>

                <div className="p_inputbox">
                    <p>{data?.name ?? ''}</p>
                    <span> name </span>
                </div>

                <div className="p_inputbox">
                    <p>{data?.email ?? ''}</p>
                    <span> email  </span>
                </div>

                <div className="p_inputbox">
                    <p>{data?.password ?? ''}</p>
                    <span>  password </span>
                </div>

                <div className="p_inputbox">
                    <p>{data?.username ?? ''}</p>
                    <span>  username </span>
                </div>

            </div>
        </div>
    )
}

export default Employe
