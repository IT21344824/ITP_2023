import "./table.scss";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// dashboard table

   



const List = () => {

    const rows =[
        {
            id: "01",
            img: "https://wallpapers.com/images/featured-full/cool-profile-pictures-4co57dtwk64fb7lv.jpg" ,
            name: "akidu",
            date: "1 march",
            duration: " 3 months",
            status: "Activated ",
        },
        {
            id: "02",
            img: "https://dlye1hka1kz5z.cloudfront.net/media/blog_images/How_Often_Should_You_Go_To_The_Gym_Does_Protein_Intake_Affect_The_Answer_2x.jpg" ,
            name: "sachini",
            date: "12 desember",
            duration: " 6 months",
            status: "Deactivated ",
        },
    ];




    return (
        <TableContainer component={Paper} className=" table" >
            <Table sx={{ minWidth: 50 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell"> ID </TableCell>
                        <TableCell className="tableCell"> Name </TableCell>
                        <TableCell className="tableCell"> Date </TableCell>
                        <TableCell className="tableCell"> Duration </TableCell>
                        <TableCell className="tableCell"> Status </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id} >
                            <TableCell className="tableCell"> {row.id} </TableCell>
                            <TableCell > 
                                <div className="cellWrapper">
                                    <img src={row.img} alt="" className="image" />
                                    {row.name}
                                </div>
                            </TableCell>
                            
                            <TableCell className="tableCell" > {row.date} </TableCell>
                            <TableCell className="tableCell" > {row.duration} </TableCell>
                            <TableCell className="tableCell" > <div className={`status ${row.status}`}> {row.status} </div></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default List
