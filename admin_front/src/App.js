
// import './App.css';
import Home from "./pages/home/Home";
//import Login from "./pages/login/Login";

import List from "./pages/User_pages/list/List";
import Single from "./pages/User_pages/single/Single";
import New from "./pages/User_pages/new/New";

//user_magagement
import Login from "./pages/User_pages/login/Login";
import UserList from "./pages/User_pages/list/List";
import UserNew from "./pages/User_pages/new/User_New";
import UserSingle from "./pages/User_pages/single/Single";

import AdminList from "./pages/User_pages/list/AdminList";
import AdminNew from "./pages/User_pages/new/Admin_new";

// Coach - magagement

import PackageNew from "./pages/Coach_pages/Packages/PackageNew";
import CoachTable from "./pages/Coach_pages/list/CoachTable";


// product_magagement
import ProductList from "./pages/Product_pages/list/Product";
import ProductID from "./pages/Product_pages/single/Product_ID";
import ProductNew from "./pages/Product_pages/new/Product_New";

// import CategoryList from "./pages/Product_pages/list/Category";
// import Category_ID from "./pages/Product_pages/single/Category_ID";


//import{render} from "react-dom" ;

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,

} from "react-router-dom";

import {  userInput ,adminInput} from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";



function App() {

  const { darkMode } = useContext(DarkModeContext);

  const {currentUser} = useContext(AuthContext)


  // if there is a current user go to children (home page) if not go to log in
  const RequireAuth = ({ children }) => {
    return currentUser ? (children) : <Navigate to="/login" />
  }

 

  return (
    <div className={darkMode ? "app dark" : "app"} >

      <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route path="login" element={<Login />} />

            <Route index element={
              <RequireAuth>
                <Home />
              </RequireAuth>} />


            <Route path="Users" >
                <Route index element={
                  <RequireAuth>
                    <UserList />
                  </RequireAuth>} />

                <Route path=":userId" element={
                  <RequireAuth>
                    <UserSingle />
                  </RequireAuth>} />

                <Route path="new" element={<RequireAuth>
                  <UserNew inputs={userInput} title="Add New Users" />
                </RequireAuth>} />


            </Route>
{/* --------------------------------------------products -------------------------------------------------*/}

            <Route path="products" >
              <Route index element={<RequireAuth> <ProductList /> </RequireAuth>} />
              <Route path=":productId" element={<RequireAuth> <ProductID /> </RequireAuth>} />
              <Route path="new" element={<RequireAuth> <ProductNew /> </RequireAuth>} />

            </Route>

            {/* <Route path="Category" >
              <Route index element={<RequireAuth> <CategoryList /> </RequireAuth>} />
              <Route path=":productId" element={<RequireAuth> <Category_ID /> </RequireAuth>} />
              <Route path="new" element={<RequireAuth> <Category_new /> </RequireAuth>} />

            </Route> */}

{/* --------------------------------------------products -------------------------------------------------*/}

            <Route path="Employees" >
                <Route index element={
                  <RequireAuth>
                    <AdminList />
                  </RequireAuth>} />
                  
                <Route path=":adminsId" element={<RequireAuth>
                  <Single />
                </RequireAuth>} />

                <Route path="new" element={<RequireAuth>
                  <AdminNew inputs={adminInput} title="Add New Employees" />
                </RequireAuth>} />

            </Route>


            <Route path="members" >
                <Route index element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>} />

                <Route path=":membersId" element={<RequireAuth>
                  <Single />
                </RequireAuth>} />

                <Route path="new" element={<RequireAuth>
                  <New inputs={userInput} title="Add New User" />
                </RequireAuth>} />

            </Route>


            <Route path="coaches" >
                <Route index element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>} />

                <Route path=":coachesId" element={<RequireAuth>
                  <Single />
                </RequireAuth>} />
                
                <Route path="new" element={<RequireAuth>
                  <New inputs={userInput} title="Add New User" />
                </RequireAuth>} />

            </Route>

            {/* ------------------------packages----------------------------------- */}

            <Route path="packages" >
              <Route index element={
                <RequireAuth>
                  <CoachTable />
                </RequireAuth>} />
              <Route path=":packagesId" element={<RequireAuth>
                <Single />
              </RequireAuth>} />
              <Route path="new" element={<RequireAuth>
                <PackageNew  />
              </RequireAuth>} />

            </Route>

             {/* ----------------------------------------------------------- */}

            <Route path="patment_INFO" >
              <Route index element={
                <RequireAuth>
                  <List />
                </RequireAuth>} />
              <Route path=":patment_INFO_Id" element={
                <RequireAuth>
                  <Single />
                </RequireAuth>} />
              <Route path="new" element={
                <RequireAuth>
                  <New inputs={userInput} title="Add New User" />
                </RequireAuth>} />

            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
