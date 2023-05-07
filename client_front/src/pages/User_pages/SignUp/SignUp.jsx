
import { useEffect, useState } from "react";
import { addDoc, collection, doc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import "./SignUp.scss";


const SignUp = () => {

  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [per, setPer] = useState(null);

  //const history = useHistory();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors] = useState({});


  const handleSubmit = async (event) => {
    event.preventDefault();
    // your registration logic here
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
      const newCartDoc = await addDoc(cartRef, { uid: res.user.uid , Total: 0, items: [] });
      const cartId = newCartDoc.id;
      await updateDoc(doc(db, "Users", res.user.uid), { cartId });

      const config = {
        //url:process.env.React_App_Register_url,
        handleCodeInApp: true,
      };

      //navigate(-1)
      console.log("Document written with ID: ", res.user.uid);
      navigate("/LogIn");

    } catch (error) {
      console.log(error)
    }
  };




  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
    setData({ ...data, [name]: value });
  };

  // --------------------------------------------------------------------------------------
  const handleClick = (e) => {
    e.preventDefault();

    navigate("/LogIn");

  };

 
  const handlehome = () => {    

    try {     
      navigate("/");     
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="sigup_back">

      <div className='signup'>
        <div className="register-container">
          <div className="home" onClick={handlehome}>
            <h1>Home</h1>
          </div>
          <form className="register-form" onSubmit={handleSubmit}>
            <h1 className="register-title">Register</h1>


            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
                required
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <button type="submit" className="submit-button">Sign up</button>

            <div className="login-container">
              <span>Already have an account?</span>
              <button onClick={handleClick} className="login-button" >
                Login
              </button>
            </div>

            <div className="divider-container">
              <hr className="divider-line" />
              <span className="divider-text">OR</span>
              <hr className="divider-line" />
            </div>

            <button className="google-button" onClick={() => alert('sign in with google')}>
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default SignUp
