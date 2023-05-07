import { useContext, useState, useRef, useEffect } from "react";
import './navbar.scss';
import { Link, Navigate } from 'react-router-dom';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { DarkModeContext } from "../../context/darkModeContext";
import { useDispatch, useSelector } from 'react-redux';
import Cart from '../Cart/Cart';
import Setting from '../setting/Setting';
import Results from './Search/Results';
import { AuthContext } from "../../context/AuthContext";

const Navbar = ({ selectedLink, handleLinkClick }) => {
  const [open, setOpen] = useState(false);
  const { dispatch } = useContext(DarkModeContext);

  //--------------search bar--------------------------
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchQuery("");
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleSearchInput = (event) => {
    setSearchQuery(event.target.value);
  };

  //did log in? start----------------------------------------------------------------------------------------------------------------


  // if there is a current user go to children (home page) if not go to log in
  const { currentUser } = useContext(AuthContext)

  // const RequireAuth = () => {
  //   return currentUser ? uid = true : uid = false
  // }

  //did log in? end----------------------------------------------------------------------------------------------------------------



  //cart------------------------
  const products = useSelector(state => state.cart.products);

  ////////////////

  //settings------------------------------------
  const [settingopen, setSettingOpen] = useState(false);


  return (
    <div className="navbar">
      <div className="wrapper">


        <div className="top_section">

          <div className="left">
            <Link to="/">
              <img src="/img/logo.jpeg" alt="" className="logo" />
            </Link>
            <div className="search_box">
              <div className="search_container" ref={searchRef}>
                <input
                  type="text"
                  placeholder="search.."
                  className="search_input"
                  onChange={handleSearchInput}
                  value={searchQuery}
                />
                <SearchIcon className="icon" />
              </div>
              {searchQuery !== "" && (
                <Results searchQuery={searchQuery} className="search_result" />
              )}
            </div>

          </div>

          <div className="middle">
            <div className="title">
              Elite
            </div>

          </div>

          <div className="right">

            <div className="l_s">
              {currentUser ? (
                ''
              ) : (
                <div className="l_s">
                  <Link className="link log_sign" to="/LogIn">
                    <div className="log">log in</div>
                  </Link>
                  <Link className="link log_sign" to="/SignUp">
                    <div className="reg">Sign Up</div>
                  </Link>
                </div>
              )}



              {/* <Link className="link log_sign" to="/LogIn">
                <div className="log">log in</div>
              </Link>
              <Link className="link log_sign" to="/SignUp">
                <div className="reg">Sign Up</div>
              </Link> */}
            </div>

            <div className="icons">
              <DarkModeOutlinedIcon className="icon darkM" onClick={() => dispatch({ type: "TOGGLE" })} />
              {currentUser ? (
                <div className="cartIocn" onClick={() => setSettingOpen(!settingopen)} >
                  <PersonIcon />
                </div>
              ) : (
                ''
              )}

              <FavoriteBorderIcon />

              {currentUser ? (
                <div className="cartIocn" onClick={() => setOpen(!open)}>
                  <ShoppingCartOutlinedIcon />
                  <span> {products.length} </span>
                </div>
              ) : (
                ''
              )}
            </div>

          </div>

        </div>

        <hr />

        <div className="bot_section">

          <div className={`item ${selectedLink === 'home' ? 'selected' : ''}`}>
            <Link className="link" to="/" onClick={() => handleLinkClick('home')}>
              {' '}
              Home Page{' '}
            </Link>
          </div>

          <div className={`item ${selectedLink === 'inventory' ? 'selected' : ''}`}>
            <Link
              className="link"
              to="/Products"
              onClick={() => handleLinkClick('inventory')}
            >
              {' '}
              Inventory{' '}
            </Link>
          </div>

          <div className={`item ${selectedLink === 'coaching' ? 'selected' : ''}`}>
            <Link className="link" to="/Coach" onClick={() => handleLinkClick('coaching')}>
              {' '}
              Coaching{' '}
            </Link>
          </div>

          <div className={`item ${selectedLink === 'more' ? 'selected' : ''}`}>
            <Link className="link" to="/More" onClick={() => handleLinkClick('more')}>
              {' '}
              More{' '}
            </Link>
          </div>

        </div>

      </div>
      {settingopen && <Setting />}
      {open && <Cart />}
    </div>
  );
};

export default Navbar;
