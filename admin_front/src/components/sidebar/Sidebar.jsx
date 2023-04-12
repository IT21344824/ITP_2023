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
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";



const Sidebar = () => {

    const { dispatch } = useContext(DarkModeContext);

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
                        <li>
                            <DashboardIcon className="iocn" />
                            <span> Dashboard </span>
                        </li>
                    </Link>

                    <p className="title"> LIST </p>

                    <Link to="/Additional" style={{ textDecoration: "none" }} >
                        <li>
                            <GroupIcon className="iocn" />
                            <span> Additional </span>
                        </li>
                    </Link>

                    <Link to="/Users" style={{ textDecoration: "none" }} >
                        <li>
                            <GroupIcon className="iocn" />
                            <span> Users </span>
                        </li>
                    </Link>

                    <Link to="/products" style={{ textDecoration: "none" }} >
                        <li>
                            <ProductionQuantityLimitsIcon className="iocn" />
                            <span> Products </span>
                        </li>
                    </Link>

                    <Link to="/Employees" style={{ textDecoration: "none" }} >
                        <li>
                            <EngineeringIcon className="iocn" />
                            <span> Employees </span>
                        </li>
                    </Link>

                    <Link to="/members" style={{ textDecoration: "none" }} >
                        <li>
                            <GroupAddIcon className="iocn" />
                            <span> Members </span>
                        </li>
                    </Link>

                    <Link to="/coaches" style={{ textDecoration: "none" }} >
                        <li>
                            <GroupAddIcon className="iocn" />
                            <span> Coaches </span>
                        </li>
                    </Link>

                    <Link to="/packages" style={{ textDecoration: "none" }} >
                        <li>
                            <GroupAddIcon className="iocn" />
                            <span> Packages </span>
                        </li>
                    </Link>

                    <Link to="/patment_INFO" style={{ textDecoration: "none" }} >
                        <li>
                            <GroupAddIcon className="iocn" />
                            <span> Patment INFO </span>
                        </li>
                    </Link>





                    <p className="title"> USEFULL </p>
                    <li>
                        <QueryStatsIcon className="iocn" />
                        <span> Stats </span>
                    </li>
                    <li>
                        <CircleNotificationsIcon className="iocn" />
                        <span> Notifications </span>
                    </li>

                    <p className="title"> SERVICE </p>
                    <li>
                        <FitnessCenterIcon className="iocn" />
                        <span> System Health </span>
                    </li>
                    <li>
                        <BookIcon className="iocn" />
                        <span> Logs </span>
                    </li>
                    <li>
                        <SettingsSuggestIcon className="iocn" />
                        <span> Settings </span>
                    </li>
                    <p className="title"> USER </p>
                    <li>
                        <AccountCircleIcon className="iocn" />
                        <span> Profile </span>
                    </li>
                    <li>
                        <LogoutIcon className="iocn" />
                        <span> Logout </span>
                    </li>
                </ul>

                <div className="bottem">
                    <div className="colorOption" onClick={() => dispatch({ type: "LIGHT" })}></div>
                    <div className="colorOption" onClick={() => dispatch({ type: "DARK" })}></div>

                </div>

            </div>

        </div>
    )
}

export default Sidebar
