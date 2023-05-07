import { useContext, useState } from "react";
import "./LogIn.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase"
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../../context/AuthContext";



const LogIn = () => {


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

      dispatch({ type: "LOGIN", payload: user });
      navigate("/");

      // console.log("correct")
    })
      .catch((error) => {

        setError(true);
        // console.log("not")
      });
  };

  // --------------------------------------------------------------------------------------
  const handleClick = (e) => {
    e.preventDefault();

    navigate("/Forgot");

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
    <div className="Loging_back">
      <div className="login">
        
        <form className="loginform" action="" onSubmit={handleLogin}>
          <h3 className="login_h">Login Here</h3>
          <input className="loginInput" type="email" placeholder="email" onChange={e => setEmail(e.target.value)} />
          <input className="loginInput" type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />

          <button className="loginbtn" type="submit"> Login </button>
          {error && <span> Wrong email or password ! </span>}
          <div className="bottom">
            <div className="left">
              <input type="checkbox" id="check"></input>
              <label for="check">Remember Me</label>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick} className="forgot-button">
              Forgot password?
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
          <div className="home" onClick={handlehome}>
          <h1>Home</h1>
        </div>
        </form>
      </div>
    </div>

  )
}

export default LogIn
