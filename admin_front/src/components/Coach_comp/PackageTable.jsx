//import "./productTable.scss";
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// import { userColums, userRows } from "../../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDoc, getDocs, addDoc, deleteDoc, doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";



const CoachTable = ({ id }) => {

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  
  //table headers
  const columns = [
    { field: "Row_id", headerName: "Row", width: 65 },
    { field: "id", headerName: "BD-id", width: 150 },
    { field: "Categories", headerName: "Categories", width: 170 },
    
    {
      field: "image",
      headerName: "Image",
      width: 130,
      renderCell: (params) => {
        const firstImg = params.row.img && Array.isArray(params.row.img) ? params.row.img[0] : "";
        return (
          <div className="cellWithImg">
            {firstImg ? <img className="cellImg" src={firstImg} alt="" /> : ""}
          </div>
        );
      },
      
    },

    
  ];

  // show all data
  
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "Packages"),
      (snapshot) => {
        let list = []
        snapshot.docs.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() })
        });
        setData(list);
      }, (error) => {
        console.log(error);
      });
    return () => {
      unsub();
    }
  }, []);


  //table delete data function
   const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Packages", id));
     setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
   
  };

  //table action header /function
  const actionColum = [
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/packages/${params.row.id}`} style={{ textDecoration: "none" }} state={{ id: params.row.id }}>
              <div className="viewButton"> View </div>
            </Link>
            <div className="deleteButton" onClick={() => handleDelete(params.row.id)}  > Delete </div>
          </div>
        );
      },
    }
  ];

  // //all date or search by name / id
  // const filteredData = data.filter((row) =>
  //   searchQuery === "" ||
  //   ["id", "Product_id", "item_name"].some(
  //     (field) =>
  //       row[field] && row[field].toString().toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
  //   )
  // );



  return (
    <div className="pro_table">

      <div className="datatable">
        <div className="datatableTitle">
          Add New Package
          <Link to="/packages/new" className="link" >
            Add New
          </Link>
        </div>
        <div className="search_table">
          <input
            type="text"
            placeholder="search Product.."
            className="input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DataGrid
          className="datagrid"
          rows={data}
          columns={columns.concat(actionColum)}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          getRowId={(row) => row.id}
        />



      </div>
    </div>
  )
}

export default CoachTable
