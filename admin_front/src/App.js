// common-------------------
// import './App.css';
//import Login from "./pages/login/Login";
//import{render} from "react-dom" ;
import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";
import { userInput, adminInput } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home/Home";



//user_magagement
import Login from "./pages/User_pages/login/Login";
import UserList from "./pages/User_pages/list/List";
import UserNew from "./pages/User_pages/new/User_New";
import UserSingle from "./pages/User_pages/single/User";

import AdminList from "./pages/User_pages/list/AdminList";
import AdminNew from "./pages/User_pages/new/Admin_new";
import Ad_single from "./pages/User_pages/single/Employe";


// Coach - magagement

import PackageNew from "./pages/Coach_pages/Packages/PackageNew";
import PackageTable from "./pages/Coach_pages/list/PackageTable";
import PackageView from "./pages/Coach_pages/View/Package_view";

import Coach_New from "./pages/Coach_pages/coach/Coach_New";
import CoachTable from "./pages/Coach_pages/list/CoachList";
import CoachView from "./pages/Coach_pages/View/Coach_vew";


// product_magagement
import ProductList from "./pages/Product_pages/list/Product";
import ProductID from "./pages/Product_pages/single/Product_ID";
import ProductNew from "./pages/Product_pages/new/Product_New";
//import ProductID_OBO from "./pages/Product_pages/Single_up_oneByOne/OneByOne";
// import CategoryList from "./pages/Product_pages/list/Category";
// import Category_ID from "./pages/Product_pages/single/Category_ID";


//Additinoal_magagement
import AdditionalMai from "./pages//Additional_pages/Additional_pg/Additional_pg";
import Additionalmore from "./pages//Additional_pages/more_pg/Add_More";


// test 
import Notify from "./components/notify_status/button_test";
import List from "./pages/User_pages/list/List";
import Single from "./pages/test/Single";
import New from "./pages/User_pages/new/New";



function App() {

  const { darkMode } = useContext(DarkModeContext);

  const { currentUser } = useContext(AuthContext)


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

            {/* --------------------------------------------Additional start -------------------------------------------------*/}

            <Route path="Additional" >
              <Route index element={
                <RequireAuth>
                  <AdditionalMai />
                  {/* <AdditionalList /> */}
                </RequireAuth>} />

              <Route path=":userId" element={
                <RequireAuth>
                  <UserSingle />
                </RequireAuth>} />



              <Route path="more" element={<RequireAuth>
                <Additionalmore />
              </RequireAuth>} />




            </Route>
            {/* --------------------------------------------Additional end -------------------------------------------------*/}

            {/* --------------------------------------------Users start -------------------------------------------------*/}

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
            {/* --------------------------------------------Users end -------------------------------------------------*/}

            {/* --------------------------------------------products start -------------------------------------------------*/}

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

            {/* --------------------------------------------products end -------------------------------------------------*/}

            <Route path="Employees" >
              <Route index element={
                <RequireAuth>
                  <AdminList />
                </RequireAuth>} />

              <Route path=":adminsId" element={<RequireAuth>
                <Ad_single />
              </RequireAuth>} />

              <Route path="new" element={<RequireAuth>
                <AdminNew inputs={adminInput} title="Add New Employees" />
              </RequireAuth>} />

            </Route>


            <Route path="members" >
              <Route index element={
                <RequireAuth>
                  {/* <List /> */}
                  <Notify />
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
                  < CoachTable />
                </RequireAuth>} />

              <Route path=":coachesId" element={<RequireAuth>
                <CoachView />
              </RequireAuth>} />

              <Route path="new" element={<RequireAuth>
                <Coach_New />
              </RequireAuth>} />

            </Route>

            {/* ------------------------packages----------------------------------- */}

            <Route path="packages" >
              <Route index element={
                <RequireAuth>
                  <PackageTable />
                </RequireAuth>} />
              <Route path=":packagesId" element={<RequireAuth>
                <PackageView />
              </RequireAuth>} />
              <Route path="new" element={<RequireAuth>
                <PackageNew />
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
