import { useEffect, useState } from "react";
import RoomIcon from '@mui/icons-material/Room';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { collection, getDocs, getDoc, addDoc, serverTimestamp, query, where, onSnapshot, doc } from "firebase/firestore";
import { db, storage, httpsCallable } from "../../firebase";
import './Apply_from.scss'

//notify-
//import NofitySuc from "../../../components/notify_status/nofity";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//--


const Apply_from = () => {

  const initialFormData = {
    name: '',
    email: '',
    chooseRole: '',
    phone: '',
    message: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name) {
      //alert("Please enter the Product_id");
      toast.warn('Please enter the Product_id!', {
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

    if (!/^[\w.-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      //alert("Please enter the Product_id");
      toast.warn('Please enter the valid email !', {
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

    
    if (!formData.chooseRole) {
      //alert("Please enter the email");
      toast.warn('Please select a Role!', {
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

  if (!formData.phone || isNaN(formData.phone)) {
      //alert("Please enter the email");
      toast.warn('Please enter a number phone!', {
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

    if (!formData.message) {
      //alert("Please enter the Product_id");
      toast.warn('Please enter the message!', {
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

    try {
      // Add the product data to the database
      const newProductRef = await addDoc(collection(db, "Applycations"), {
        ...formData,
        timeStamp: serverTimestamp(),
      });
      console.log("Document written with ID: ", newProductRef.id);
      //nofity

      toast.success(`Successfully \n from send`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setFormData(initialFormData);


    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };


  // if click out side of form role = null
  useEffect(() => {
    const handleClickOutsideForm = event => {
      if (event.target.closest("form") === null) {
        setFormData(prevState => ({ ...prevState, chooseRole: "" }));
      }
    };
    window.addEventListener("click", handleClickOutsideForm);
    return () => {
      window.removeEventListener("click", handleClickOutsideForm);
    };
  }, []);

  //get details---------------------------------------------------------------------------------------------------------------------------------
    
  const _id = "MorePageApplyForm";

  //geting selected data
  const [data, setData] = useState({});

  
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


  return (
    <div className="apply_from_container">
      <div className="top">
        <h1> Apply for </h1>
        <p> {data.AF_title} </p>
      </div>


      <div className="container">

        <div className="contactForm">
          <form onSubmit={handleSubmit}>
            <h2> Apply for </h2>

            <div className="inputbox">
              <input
                type="text"
                name="name"
                required="required"
                onChange={handleInputChange}
                value={formData.name}
              />
              <span> Full Name : </span>
            </div>

            <div className="inputbox">
              <input
                type="text"
                value={formData.email}
                name="email"
                required="required"
                onChange={handleInputChange}
              />
              <span> Email : </span>
            </div>

            {/* //---------------------- */}
            <div className="inputbox" >
              <label className="select_role_lable"> Role : </label>
              <div className="select_role" >
                <label >
                  <input
                    type="radio"
                    name="chooseRole"
                    value="Trainer"
                    checked={formData.chooseRole === "Trainer"}
                    onChange={handleInputChange}
                    required
                  />
                  Trainer
                </label>
                <label>
                  <input
                    type="radio"
                    name="chooseRole"
                    value="Employee"
                    checked={formData.chooseRole === "Employee"}
                    onChange={handleInputChange}
                    required
                  />
                  Employee
                </label>
              </div>

            </div>
            {/* //-------------------- */}


            <div className="inputbox">
              <input
                type="text"
                value={formData.phone}
                name="phone"
                required="required"
                onChange={handleInputChange}
              />
              <span> Phone No : </span>
            </div>


            <div className="inputbox">
              <textarea
                name="message"
                cols="30" rows="10"
                required="required"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
              <span> Type your Message...</span>
            </div>

            <div className="inputbox">
              <button type="submit" > Send </button>

            </div>
          </form>
        </div>

        <div className="contactInfo">

          <div className="box">
            {/* <img src="/more_pg/t3.jpg" alt="" /> */}
            <img src={data.img} alt="" />
          </div>

          <div className="box_details">
            <p> {data.AF_descrip} </p>
          </div>


        </div>
      </div>
    </div>
  )
}

export default Apply_from
