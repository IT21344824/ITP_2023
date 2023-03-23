import "./product_ID.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useEffect, useState } from "react";
import { getDoc, collection, query, doc, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useLocation } from "react-router-dom";
import Modal from 'react-modal';
// import 'react-modal/style/modal.css';
import Cart from '../../../components/Product_comp/update_popup/UpdatePopup'; // pass the page , id to update page


const Product_ID = ({ id }) => {

    //geting id from http
    const location = useLocation();
    const _id = location.state.id;
   

    //geting selected data
    const [data, setData] = useState({});


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
            console.log(item_type_data.Cat_name);
            return item_type_data.Cat_name.toString();

        } catch (error) {
            console.error(error);
            return "";
        }
    };


    useEffect(() => {
        const docRef = doc(db, "products", _id);

        const unsubscribe = onSnapshot(docRef, async (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setData(data); 

                // update the state with retrieved data
                const categoryDoc = await getDoc(data.item_type);
               
                const item_type_ref = data.item_type;

                getItemTypeData(item_type_ref).then((data) => {
                    setItemTypeData((prevData) => ({ ...prevData, categoryDoc: data }));
                });

            } else {
                console.log("No such document!");
            }
        }, (error) => {
            console.log("Error getting document:", error);
        });

        // unsubscribe from the listener when the component unmounts
        return () => unsubscribe();
    }, [_id]);



    //----------------------------------------

    //pre image soom
    const [selectedImg, setSelectedImg] = useState(null);

    const handleImageClick = (index) => {
        setSelectedImg(index);
    };
    //------------------------------

    const [open, setOpen] = useState(false);

    const [selectedId, setSelectedId] = useState(null);

    const handleOpen = (id) => {
        setSelectedId(id);
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
    };

    //item_type refarence 


    return (
        <div className="pro_single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="top">
                    <div className="top_pre">
                        <div className="pre_title">
                            <h1>Product Details</h1>
                            <button onClick={() => handleOpen(_id)}>edit</button>

                        </div>
                        <div className="pre_Img">

                            {data?.img?.map((img, index) => (
                                <div key={index} onClick={() => handleImageClick(index)}  >
                                    <img src={img} alt="product" />
                                </div>
                            ))}
                        </div>
                        {selectedImg !== null && (
                            <Modal
                                isOpen={true}
                                onRequestClose={() => setSelectedImg(null)}
                                style={{
                                    content: {
                                        // display: "flex",
                                        // justifyContent: "center",
                                        // alignItems: "center",

                                    },
                                }}
                            >
                                <img src={data?.img?.[selectedImg]} alt="product" />
                                <br />
                                <button onClick={() => setSelectedImg(null)} className="selct_img_cancle_buton">Close</button>

                            </Modal>
                        )}



                        <div>
                            <table className="table_predata">
                                <tbody>
                                    <tr>
                                        <td> Product Id </td>
                                        <td>&nbsp;&nbsp;: &nbsp;&nbsp;</td>
                                        <td><span className="previous_data">{data?.Product_id ?? ''}</span></td>
                                    </tr>
                                    <tr>
                                        <td>Item Name </td>
                                        <td>&nbsp;&nbsp;: &nbsp;&nbsp;</td>
                                        <td><span className="previous_data">{data?.item_name ?? ''}</span></td>
                                    </tr>
                                    <tr>
                                        <td>Price (RS) </td>
                                        <td>&nbsp;&nbsp;: &nbsp;&nbsp;</td>
                                        <td><span className="previous_data">{data?.price ?? ''}</span></td>
                                    </tr>
                                    <tr>
                                        <td>Quantity</td>
                                        <td>&nbsp;&nbsp;: &nbsp;&nbsp;</td>
                                        <td><span className="previous_data">{data?.qty ?? ''}</span></td>
                                    </tr>
                                    <tr>
                                        <td>Item Type </td>
                                        <td>&nbsp;&nbsp;: &nbsp;&nbsp;</td>
                                        <td><span className="previous_data">{itemTypeData.categoryDoc}</span></td>
                                    </tr>

                                    <tr>
                                        <td> status </td>
                                        <td>&nbsp;&nbsp;: &nbsp;&nbsp;</td>
                                        <td><span className="previous_data">{data?.status ?? ''}</span></td>
                                    </tr>
                                    <tr>
                                        <td>Description </td>
                                        <td>&nbsp;&nbsp;: &nbsp;&nbsp;</td>
                                        <td><span className="previous_data">{data?.description ?? ''}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>






                    </div>
                </div>
            </div>
            <Cart open={open} onClose={handleClose} id={selectedId} />
            {/* <Cart open={open} onClose={handleClose} /> */}
        </div>
    );
};

export default Product_ID;
