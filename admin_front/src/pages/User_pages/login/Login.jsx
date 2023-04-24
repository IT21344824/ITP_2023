import { useContext, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext";

const Login = () => {

  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in 
      const user = userCredential.user;

      console.log(user)
      // Check user role
      //  if (user.role === "Admin") {
      dispatch({ type: "LOGIN", payload: user });
      navigate("/");
      // } else {
      //   setError(true);
      // }
    })
      .catch((error) => {
        setError(true);
      });
  };


  return (
    <div className="login">
      <form className="loginform" action="" onSubmit={handleLogin}>
        <h3 className="login_h">Admin Login </h3>
        <input className="loginInput" type="email" placeholder="email" onChange={e => setEmail(e.target.value)} />
        <input className="loginInput" type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />

        <button className="loginbtn" type="submit"> Login </button>

        {error && <span> Wrong email or password ! </span>}
      </form>
    </div>
  )
}

export default Login
