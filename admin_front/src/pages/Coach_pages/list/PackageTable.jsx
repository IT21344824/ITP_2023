import "./Package.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import  PackageTable from "../../../components/Coach_comp/PackageTable";

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
        <div className="listContainer">
          <Navbar/>
          <PackageTable/>
        </div>
    </div>
  )
}

export default List
