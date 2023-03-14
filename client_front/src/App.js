
// common
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Route,
} from "react-router-dom";
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
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

  return(
    <div className='app'>
      <Navbar />
      
      <Outlet/>
      <Footer />
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
  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
    
  );
}

export default App;
