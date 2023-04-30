
// common
import {  createBrowserRouter,  RouterProvider,  Outlet,  Route, Navigate} from "react-router-dom";
import React, { useContext , useState, useEffect } from 'react';
import More_fg from "./pages/More_pg/More_fg";

import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ContactUs from './components/contact_us/ContactUs';
import AboutUs from './components/about_us/AboutUs';
import { DarkModeContext } from "./context/darkModeContext";
import "./style/dark.scss";
import './App.scss';
import { AuthContext } from "./context/AuthContext";


//user managements
import LogIn from './pages/User_pages/LogIn/LogIn';
import SignUp from './pages/User_pages/SignUp/SignUp';
import Forgot from "./pages/User_pages/Forgot/Forgot";


//Product managements
import Products from './pages/Product_pages/Products/Products';
import Product from './pages/Product_pages/Product/Product';

//Coach managements
import Coach from './pages/Coach_pages/Coach_1/Coach';
import Trainer from "./pages/Coach_pages/Coach_2/Trainer";

//cart managements
import Cart from './pages/Cart_pages/Cart_page';


//payment management
import Payment from './pages/payment/payment' ;
import OnlineP from './pages/payment/Options/OnlineP';
import DirectP from './pages/payment/Options/DirectP';
import OrderBSuccess from './pages/payment/PaySuccess/OrderBSuccess';
import OrderDSuccess from './pages/payment/PaySuccess/OrderDSuccess';



const Layout = () => {

 // if there is a current user go to children (home page) if not go to log in
  const { currentUser } = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? (children) : <Navigate to="/login" />
  }


  const { darkMode } = useContext(DarkModeContext);
  
  const [selectedLink, setSelectedLink] = useState(localStorage.getItem('selectedLink') || '');

  const handleLinkClick = (link) => {
    setSelectedLink(link);
    localStorage.setItem('selectedLink', link);
  };

  useEffect(() => {
    const storedSelectedLink = localStorage.getItem('selectedLink');
    if (storedSelectedLink) {
      setSelectedLink(storedSelectedLink);
    }
  }, []);

  return(
    <div className={darkMode ? "app dark" : "app"}>
      <Navbar selectedLink={selectedLink} handleLinkClick={handleLinkClick} />
      <Outlet/>
      <Footer selectedLink={selectedLink} handleLinkClick={handleLinkClick} />
    </div>
  )
}



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/Products",
        element: <Products/>,
      },
      {
        path: "/Products/:id",
        element: <Product/>,
      },
      {
        path: "/Coach",
        element: <Coach/>,
      },
      {
        path: "/Trainer/:id",
        element: <Trainer/>,
      },
      {
        path: "/newCart",
        element: <Cart/>,
      },
      {
        path: "/aboutUs",
        element: <AboutUs/>,
      },
      {
        path: "/contactUs",
        element: <ContactUs/>,
      },
      {
        path: "/More",
        element: <More_fg/>,
      },
      {
        path: "/payment",
        element: <Payment/>,
      },

      {
        path: "/OnlineP",
        element: <OnlineP/>,
      },

      {
        path: "/DirectP",
        element: <DirectP/>,
      },

      {
        path: "/OrderBSuccess",
        element: <OrderBSuccess/>,
      },

      {
        path: "/OrderDSuccess",
        element: <OrderDSuccess/>,
      },
      
    ]
  },
  {
    path: "/LogIn",
    element: <LogIn/>,
  }, 
  {
    path: "/SignUp",
    element: <SignUp/>,
  }, 
  {
    path: "/Forgot",
    element: <Forgot/>,
  },
 
]);

function App() {

  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
    
  );
}

export default App;
