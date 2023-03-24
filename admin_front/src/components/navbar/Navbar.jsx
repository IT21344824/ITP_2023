import "./navbar.scss";
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ListIcon from '@mui/icons-material/List';
import CropFreeOutlinedIcon from '@mui/icons-material/CropFreeOutlined';
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import Results from "../SearchBar/Results";


const Navbar = () => {

  const { dispatch } = useContext(DarkModeContext);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInput = (event) => {
    setSearchQuery(event.target.value);
  }


  return (
    <div className='navbar'>
      <div className="wrapper">

        <div className="search_box">

          <div className="search_container">
            <input type="text" placeholder="search.." className="search_input" onChange={handleSearchInput} />
            <SearchIcon className="icon" />
          </div>

          {searchQuery !== "" && <Results searchQuery={searchQuery} className="search_result" />}

        </div>

        <div className="items">
          <div className="item">
            <LanguageIcon className="icon" />
            English
          </div>

          <div className="item" >
            <DarkModeOutlinedIcon className="icon" onClick={() => dispatch({ type: "TOGGLE" })} />
          </div>

          <div className="item">
            <CropFreeOutlinedIcon className="icon" />
          </div>

          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>

          <div className="item">
            <ChatBubbleOutlineIcon className="icon" />
            <div className="counter">2</div>
          </div>

          <div className="item">
            <ListIcon className="icon" />
          </div>

          <div className="item">
            <img src="/no-avatar.png" alt="" className="avatar" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
