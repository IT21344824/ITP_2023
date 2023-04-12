import "./Product.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import ProductTable from "../../../components/Product_comp/datatable/ProductTable";
import CategorTable from "../../../components/Product_comp/datatable/CategorTable";
//notify-
//import NofitySuc from "../../../components/notify_status/nofity";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//--

const List = () => {
  //nofify--
  const notifyStyle = {
    whiteSpace: 'pre-line'
  }
  const progressStyle = {
    background: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)'
  }

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <ProductTable />
        <div>
          <CategorTable className="CategorTable" />
        </div>
      </div>
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={6} //-
        hideProgressBar={false}
        newestOnTop={false} //-
        closeOnClick
        rtl={false} //--
        pauseOnFocusLoss //--
        draggable
        pauseOnHover
        theme="colored"

        style={notifyStyle}
      // progressStyle={progressStyle}
      />
    </div>
  )
}

export default List
