import React from 'react'
import './LogIn.scss'
import { signInWithEmailAndPassword } from "firebase/auth";
//import { auth } from "../../../firebase"
import { Link, useNavigate } from 'react-router-dom';
//import { AuthContext } from "../../../context/AuthContext";
import { useContext, useState } from "react";

const LogIn = () => {

  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  //const { dispatch } = useContext(AuthContext)

  const handleLogin = (e) => {
    // e.preventDefault();

    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in 
    //     const user = userCredential.user;
    //     dispatch({ type: "LOGIN", payload: user })
    //     navigate("/")
    //     // ...
    //   })
    //   .catch((error) => {
    //     setError(true)
    //   });
  };

  return (
    <div className=''>
      <Link to="/" className="link" >
        <div className="home"> Home </div>
      </Link>
      <div className='login'>
        <form action="" onSubmit={handleLogin}>
          <input type="email" placeholder="email" onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />

          <button type="submit"> Login </button>

          {error && <span> Wrong email or password ! </span>}
        </form>

      </div>

    </div>
  )
}

export default LogIn
