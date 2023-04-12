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

    if (!formData.email) {
      //alert("Please enter the Product_id");
      toast.warn('Please enter the email!', {
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


  return (
    <div className="apply_from_container">
      <div className="top">
        <h1> Apply for </h1>
        <p>From its medieval origins to the digital era, learn everything there is to know about the ubiquitous lorem ipsum passage</p>
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
            <img src="/more_pg/t3.jpg" alt="" />
          </div>

          <div className="box_details">
            <p>Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,
              a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur,
              from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.
              Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
              written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,
              "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
              The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
              Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form,
              accompanied by English versions from the 1914 translation by H. Rackham.
            </p>
          </div>


        </div>
      </div>
    </div>
  )
}

export default Apply_from
