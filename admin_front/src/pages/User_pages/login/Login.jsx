import { useContext, useState } from "react";
import "./login.scss";
import {  signInWithEmailAndPassword  } from "firebase/auth";
import {auth} from "../../../firebase"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext";

const Login = () => {

  const [error , setError] = useState(false);
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");

  const navigate = useNavigate();

  const {dispatch} = useContext(AuthContext)

  const handleLogin = (e)=>{
    e.preventDefault();
  
    signInWithEmailAndPassword (auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // Check if the user's role is "Admins"
      
      // const userRole = user?.metadata?.customClaims?.role;
      // if (userRole === "Admins") {
        dispatch({type:"LOGIN" , payload:user})
        navigate("/")
      // } else {
      //   setError(true)
      // }
    })
    .catch((error) => {
      setError(true)
    });
  };
  
  return (
    <div className="login">
      <form action=""onSubmit={handleLogin}>
        <input type="email" placeholder="email" onChange={e=>setEmail(e.target.value)}/>
        <input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)} />

        <button type="submit"> Login </button>

        {error && <span> Wrong email or password ! </span>}
      </form>
    </div>
  )
}

export default Login
