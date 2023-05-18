import React from 'react'
import "./PaymentList.scss";
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDoc, getDocs, addDoc, deleteDoc, doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { onConfirm } from 'react-confirm-pro';



const PaymentList = () => {

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
 

  //table headers
  const columns = [
    { field: "Row_id", headerName: "Row", width: 65 },
    { field: "id", headerName: "BD-id", width: 150 },
    { field: "oldformData", headerName: "payment", width: 170 },

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
      collection(db, "payment"),
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


   //---------------------------------------------------------------------------------------------
   //table delete data function
   const handleDelete = async (id) => {
    const defaultOptions = {
      title: (
        <h3>
          Are you sure?
        </h3>
      ),
      description: (
        <p>Do you really want to delete this records? This process cannot be undone.</p>
      ),
      onSubmit: async () => {
        try {
          await deleteDoc(doc(db, "payment", id));
          setData(data.filter((item) => item.id !== id));
        } catch (error) {
          console.log(error);
        }

      },
      onCancel: () => {
        // alert("Cancel")
      },
    };
    onConfirm({
      ...defaultOptions,
      type: "dark",
      btnSubmit: "confirm ",
      btnCancel: "Cancle ",
      keyboardEvents: {
        escape: true,
        submit: true
      }
    })

  };
  //table delete data function
  // const handleDelete = async (id) => {
  //   try {
  //     await deleteDoc(doc(db, "payment", id));
  //     setData(data.filter((item) => item.id !== id));
  //   } catch (error) {
  //     console.log(error);
  //   }

  // };

  //table action header /function
  const actionColum = [
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/patment_INFO/${params.row.id}`} style={{ textDecoration: "none" }} state={{ id: params.row.id }}>
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
   ["id", "oldformData.email"].some(
     (field) =>
       row[field] && row[field].toString().toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
   )
 );



  return (
    <div className='Payment_list_comp'>
      <div className="datatable">
        <div className="datatableTitle">
          Payment details

        </div>
        <div className="search_table">
          <input
            type="text"
            placeholder="search .."
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

export default PaymentList
