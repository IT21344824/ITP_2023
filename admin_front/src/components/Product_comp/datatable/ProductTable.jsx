import "./productTable.scss";
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
// import { userColums, userRows } from "../../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDoc, getDocs, addDoc, deleteDoc, doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import CatUpdate from '../category_update/CatUpdate'; // pass the page , id to update page


const ProductTable = ({ id }) => {

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  //----------------------------------------------------------Category------------------------------------------------------------



  // ------------------------------------------------------table functions----------------------------------------------------------------

  const [itemTypeData, setItemTypeData] = useState({});

  const getItemTypeData = async (item_type_ref) => {
    if (!item_type_ref) {
      return "";
    }
    try {
      const snapshot = await getDoc(item_type_ref);
      const item_type_data = snapshot.data();
      if (!item_type_data) {
        return "";
      } 
      //console.log(item_type_data.Cat_name);
      return item_type_data.Cat_name.toString();
      
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  //table headers
  const columns = [
    { field: "Row_id", headerName: "Row", width: 65 },
    { field: "id", headerName: "BD-id", width: 150 },
    { field: "Product_id", headerName: "Product ID", width: 150 },
    { field: "item_name", headerName: "Item Name", width: 150 },
    {
      field: "image",
      headerName: "Image",
      width: 130,
      renderCell: (params) => {
        const firstImg = params.row.img[0];
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={firstImg} alt="" />
          </div>
        );
      },
    },
    { field: "qty", headerName: "Quantity", width: 110 },
    { field: "status", headerName: "Status", width: 150 },
    {
    field: "item_type",
    headerName: "Item Type",
    width: 150,
    valueGetter: (params) => {
      const item_type_ref = params.row.item_type;
      if (!item_type_ref) {
        return "";
      }
      if (itemTypeData[params.row.id]) {
        return itemTypeData[params.row.id];
      }
      getItemTypeData(item_type_ref).then((data) => {
        setItemTypeData((prevData) => ({ ...prevData, [params.row.id]: data }));
      });
      return "[Loading]";
    },
  },
    
  ];


  // show all Category data
  //    const [Cat_data, setCat_Data] = useState([]);

  //    useEffect(() => {
  //     const unsub = onSnapshot(
  //         collection(db, "Product_Category"),
  //         (snapshot) => {
  //             let list = []
  //             snapshot.docs.forEach(doc => {
  //                 list.push({ id: doc.id, ...doc.data() })
  //             });
  //             setCat_Data(list);
  //         }, (error) => {
  //             console.log(error);
  //         });
  //     return () => {
  //         unsub();
  //     }
  // }, []);


  // show all data
  
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "products"),
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
      await deleteDoc(doc(db, "products", id));
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
            <Link to={`/products/${params.row.id}`} style={{ textDecoration: "none" }} state={{ id: params.row.id }}>
              <div className="viewButton"> View </div>
            </Link>
            <div className="deleteButton" onClick={() => handleDelete(params.row.id)}  > Delete </div>
          </div>
        );
      },
    }
  ];

  //all date or search by name / id
  const filteredData = data.filter((row) =>
    searchQuery === "" ||
    ["id", "Product_id", "item_name"].some(
      (field) =>
        row[field] && row[field].toString().toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
    )
  );



  return (
    <div className="pro_table">

      <div className="datatable">
        <div className="datatableTitle">
          Add New Product
          <Link to="/products/new" className="link" >
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
          rows={filteredData.map((row, index) => ({ ...row, Row_id: index + 1 }))}
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

export default ProductTable
