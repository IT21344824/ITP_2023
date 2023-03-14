import "./Product.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import ProductTable from "../../../components/Product_comp/datatable/ProductTable";
import CategorTable from "../../../components/Product_comp/datatable/CategorTable";

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
        <div className="listContainer">
          <Navbar/>
          <ProductTable/>
          <CategorTable className="CategorTable"/>
        </div>
    </div>
  )
}

export default List
