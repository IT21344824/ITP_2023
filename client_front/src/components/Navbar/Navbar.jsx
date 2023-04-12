import { useContext, useState, useRef, useEffect } from "react";
import './navbar.scss';
import { Link } from 'react-router-dom';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { DarkModeContext } from "../../context/darkModeContext";
import Cart from '../Cart/Cart';
import Results from './Search/Results';

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

  //-----------------------------------------------------


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

          <div className="right">

            <div className="l_s">
              <Link className="link log_sign" to="/LogIn">
                <div className="log">log in</div>
              </Link>
              <Link className="link log_sign" to="/SignUp">
                <div className="reg">Sign Up</div>
              </Link>
            </div>

            <div className="icons">
              <DarkModeOutlinedIcon className="icon" onClick={() => dispatch({ type: "TOGGLE" })} />
              <PersonIcon />
              <FavoriteBorderIcon />
              <div className="cartIocn" onClick={() => setOpen(!open)}>
                <ShoppingCartOutlinedIcon />
                <span>0</span>
              </div>
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
      {open && <Cart />}
    </div>
  );
};

export default Navbar;
