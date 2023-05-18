import "./sidebar.scss";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import BookIcon from '@mui/icons-material/Book';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupIcon from '@mui/icons-material/Group';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { Link , useNavigate} from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import AddchartIcon from '@mui/icons-material/Addchart';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';


const Sidebar = () => {

    const { dispatch: darkModeDispatch } = useContext(DarkModeContext);

    //selected link 
    const [clickedElement, setClickedElement] = useState(
        localStorage.getItem("clickedElement") || ""
    );

    const handleClickedElement = (element) => {
        localStorage.setItem("clickedElement", element);
        setClickedElement(element);
    };

    // log out--
    const navigate = useNavigate();
    const { dispatch: authDispatch } = useContext(AuthContext);

    const onlogOut = ()=>{
        authDispatch({type:"LOGOUT" });
        navigate("/");
    }


    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/" style={{ textDecoration: "none" }} >
                    <span className="logo"> Elite</span>
                    <img src="/logo.jpeg" alt="" className="logo" />
                </Link>

            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title"> MAIN </p>
                    <Link to="/" style={{ textDecoration: "none" }} >
                        <li onClick={() => handleClickedElement("Dashboard")} className={clickedElement === "Dashboard" ? "selected" : ""}>

                            <DashboardIcon className="iocn" />
                            <span> Dashboard </span>
                        </li>
                    </Link>


                    <p className="title"> LIST </p>
                    {/* ----------------------------list start ----------------*/}


                    <Link to="/Additional" style={{ textDecoration: "none" }} >
                        <li onClick={() => handleClickedElement("Additional")} className={clickedElement === "Additional" ? "selected" : ""}>
                            <DataSaverOnIcon className="iocn" />
                            <span> Additional </span>
                        </li>
                    </Link>


                    <Link to="/Users" style={{ textDecoration: "none" }} >
                        <li onClick={() => handleClickedElement("Users")} className={clickedElement === "Users" ? "selected" : ""}>
                            <GroupIcon className="iocn" />
                            <span> Users </span>
                        </li>
                    </Link>

                    <Link to="/products" style={{ textDecoration: "none" }} >
                        <li onClick={() => handleClickedElement("products")} className={clickedElement === "products" ? "selected" : ""}>
                            <ProductionQuantityLimitsIcon className="iocn" />
                            <span> Products </span>
                        </li>
                    </Link>

                    <Link to="/Employees" style={{ textDecoration: "none" }} >
                        <li onClick={() => handleClickedElement("Employees")} className={clickedElement === "Employees" ? "selected" : ""}>
                            <EngineeringIcon className="iocn" />
                            <span> Employees </span>
                        </li>
                    </Link>

                    <Link to="/test" style={{ textDecoration: "none" }} >
                        <li onClick={() => handleClickedElement("members")} className={clickedElement === "members" ? "selected" : ""}>
                            <GroupAddIcon className="iocn" />
                            <span> test </span>
                        </li>
                    </Link>

                    <Link to="/coaches" style={{ textDecoration: "none" }} >
                        <li onClick={() => handleClickedElement("coaches")} className={clickedElement === "coaches" ? "selected" : ""}>
                            <AccessibilityIcon className="iocn" />
                            <span> Coaches </span>
                        </li>
                    </Link>

                    <Link to="/packages" style={{ textDecoration: "none" }} >
                        <li onClick={() => handleClickedElement("packages")} className={clickedElement === "packages" ? "selected" : ""}>
                            <AutoAwesomeMotionIcon className="iocn" />
                            <span> Packages </span>
                        </li>
                    </Link>

                    <Link to="/patment_INFO" style={{ textDecoration: "none" }} >
                        <li onClick={() => handleClickedElement("patment_INFO")} className={clickedElement === "patment_INFO" ? "selected" : ""}>
                            <AttachMoneyIcon className="iocn" />
                            <span> Patment INFO </span>
                        </li>
                    </Link>

                    {/* ----------------------------list end ----------------*/}




                    <p className="title"> USEFULL </p>
                    {/* ----------------------------Usefull start ----------------*/}


                    <Link to="/Contact_Us" style={{ textDecoration: "none" }} >
                    <li onClick={() => handleClickedElement("Contact Us")} className={clickedElement === "Contact Us" ? "selected" : ""}>
                        <ContactPhoneIcon className="iocn" />
                        <span> Contact Us </span>
                    </li>
                    </Link>

                    
                    <Link to="/Applycations" style={{ textDecoration: "none" }} >
                    <li onClick={() => handleClickedElement("Applycations")} className={clickedElement === "Applycations" ? "selected" : ""}>
                        <AddchartIcon className="iocn" />
                        <span> Applycations </span>
                    </li>
                    </Link>
                   
                    {/* -----------------------------Usefull end----------------------------  */}




                    <p className="title"> SERVICE </p>
                    {/* ------------------------------SERVICE start------------------------- */}


                    <li onClick={() => handleClickedElement("Stats")} className={clickedElement === "Stats" ? "selected" : ""}>
                        <QueryStatsIcon className="iocn" />
                        <span> Stats </span>
                    </li>

                    <li onClick={() => handleClickedElement("Notifications")} className={clickedElement === "Notifications" ? "selected" : ""}>
                        <CircleNotificationsIcon className="iocn" />
                        <span> Notifications </span>
                    </li>

                    <li onClick={() => handleClickedElement("Settings")} className={clickedElement === "Settings" ? "selected" : ""}>
                        <SettingsSuggestIcon className="iocn" />
                        <span> Settings </span>
                    </li>
                    {/*---------------------------------- SERVICE end---------------------------- */}




                    <p className="title"> USER </p>
                    {/*----------------------------------- USER start -------------------------------*/}


                    <li onClick={() => handleClickedElement("Profile")} className={clickedElement === "Profile" ? "selected" : ""}>
                        <AccountCircleIcon className="iocn" />
                        <span> Profile </span>
                    </li>

                    <li onClick={() => handleClickedElement("Logout")} className={clickedElement === "Logout" ? "selected" : ""}>
                        <LogoutIcon className="iocn" />
                        <span onClick={()=> onlogOut()}> Logout </span>
                    </li>
                    {/*------------------------------------ USER end--------------------------------- */}
                </ul>


                <div className="bottem">
                    <div className="colorOption" onClick={() => darkModeDispatch({ type: "LIGHT" })}></div>
                    <div className="colorOption" onClick={() => darkModeDispatch({ type: "DARK" })}></div>

                </div>

            </div>

        </div>
    )
}

export default Sidebar
