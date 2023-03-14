import "./datatable.scss";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { userColums, userRows } from "../../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs , deleteDoc , doc , onSnapshot  } from "firebase/firestore";
import { db } from "../../../firebase";

{/* This is all users table  */ }

const Datatable = () => {

  const [data, setData] = useState([]);

  useEffect(() => {

    const unsub = onSnapshot(
      collection(db, "Admins"),
      (snapshot) => {
      let list =[]
      snapshot.docs.forEach(doc=>{
        list.push({ id:doc.id , ...doc.data()})
      });
      setData(list);
  }, (error)=>{
    console.log(error);
  });
  return ()=>{
    unsub();
  }
  }, [])

  console.log(data);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Admins", id));
     setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
   
  };

  const actionColum = [
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }} >
              <div className="viewButton"> View </div>
            </Link>
            <div className="deleteButton" onClick={() => handleDelete(params.row.id)}  > Delete </div>
          </div>
        );
      },
    }
  ]


  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New Admins
        <Link to="/Admins/new" className="link" >
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColums.concat(actionColum)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  )
}

export default Datatable
