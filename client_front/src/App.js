
// common
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Route,
} from "react-router-dom";
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

//user managements
import LogIn from './pages/User_pages/LogIn/LogIn';
import SignUp from './pages/User_pages/SignUp/SignUp';

//user managements
import Products from './pages/Product_pages/Products/Products';
import Product from './pages/Product_pages/Product/Product';

//user managements
import Coach from './pages/Coach_pages/Coach_1/Coach';


//cart managements
import Cart from './pages/Cart_pages/Cart_page';


const Layout = () => {
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
