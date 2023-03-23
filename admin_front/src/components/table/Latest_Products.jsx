import "./Latest_Products.scss";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';


const Latest_Products = () => {

    const [newproducts, setNewProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          const today = new Date();
          const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));
          const prevMonthQuery = query(
            collection(db, 'products'),
            where('timeStamp', '>', prevMonth)
          );
    
          const unsub = onSnapshot(prevMonthQuery, (snapshot) => {
            let list = [];
            snapshot.docs.forEach((doc) => {
              const data = doc.data();
              const timestamp = data.timeStamp;
              const date = new Date(timestamp.toMillis());
              list.push({
                id: doc.id,
                Product_id: data.Product_id,
                item_name: data.item_name,
                img: data.img,
                date: date.toLocaleString(), // format the date as a string
                status: data.status,
                action: data.action,
              });
            });
            setNewProducts(list);
          }, (error) => {
            console.log(error);
          });
    
          return () => {
            unsub();
          };
        };
    
        fetchData();
      }, []);
    //table action header /function


    return (
        <TableContainer component={Paper} className=" table">
            <Table sx={{ minWidth: 50 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell"> P_ID </TableCell>
                        <TableCell className="tableCell"> Name </TableCell>
                        <TableCell className="tableCell"> Date </TableCell>
                        <TableCell className="tableCell"> Status </TableCell>
                        <TableCell className="tableCell"> Action </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    
                {newproducts.length > 0 ? ( 
                    newproducts.map((row) => (
                        <TableRow key={row.id} >
                            <TableCell className="tableCell"> {row.Product_id} </TableCell>
                            <TableCell >
                                <div className="cellWrapper">
                                    <img src={row.img} alt="" className="image" />
                                    {row.item_name}
                                </div>
                            </TableCell>

                            <TableCell className="tableCell" > {row.date}</TableCell>
                            <TableCell className="tableCell" >
                                <div className={`status ${row.status.replace(/\s+/g, '')}`}>{row.status}</div>
                            </TableCell>
                            <TableCell className="tableCell" >

                                <Link to={`/products/${row.id}`} style={{ textDecoration: "none" }} state={{ id: row.id }}>
                                    <div className="viewButton"> View </div>
                                </Link>

                            </TableCell>
                        </TableRow>
                    ))
                    ) : (
                      <TableRow  className="no_data">
                        <TableCell colSpan={5} className="tableCell">
                          No New Products
                        </TableCell>
                      </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Latest_Products
