import "./Product.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import CoachTable from "../../../components/Coach_comp/CoachTable";

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
        <div className="listContainer">
          <Navbar/>
          <CoachTable/>
        </div>
    </div>
  )
}

export default List
