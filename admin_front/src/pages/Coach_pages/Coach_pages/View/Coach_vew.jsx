import { useEffect, useState } from "react";
import { getDoc, collection, query, doc, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useLocation } from "react-router-dom";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import "./Coach_vew.scss";

const Coach_vew = () => {

      //geting id from http
      const location = useLocation();
      const _id = location.state?.id;
 
          //geting selected data
     const [data, setData] = useState({});
     console.log(data.img);
 
     
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

  return (
    <div className="Coach_vew">
        <Sidebar />
            <div className="con">
                <Navbar />

                <div className="delail">
                    <div className="pre_Img">
                        <img src={data?.img ?? ''} alt="product" style={{ height: "300px" }} />

                    </div>


                    <div className="p_inputbox">
                        <p>{data?.Coach_id ?? ''}</p>
                        <span> Coach_id </span>
                    </div>

                    <div className="p_inputbox">
                        <p>{data?.Coach_name ?? ''}</p>
                        <span> Coach_name </span>
                    </div>

                    <div className="p_inputbox">
                        <p>{data?.contact ?? ''}</p>
                        <span> contact </span>
                    </div>

                    <div className="p_inputbox">
                        <p>{data?.description ?? ''}</p>
                        <span> description </span>
                        
                    </div>
                    <button >Edit</button>
                    
                </div>
                
            </div>
    </div>
  )
}

export default Coach_vew
