import './UpdatePopup.scss';
import React, { useState, useEffect, useRef } from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { collection, doc, updateDoc, setDoc, serverTimestamp, getDocs, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const UpdatePopup = ({ open, onClose, id }) => {

  //------------images-------------------------
  const [files, setFiles] = useState([]);
  //-------------------------------------




  //---------------------------------------Product data---------------------------------
  const initialUpdateData = {
    Product_id: "",
    item_name: "",
    price: "",
    qty: "",
    description: "",
    item_type: "",
    status: "",
    //imgs: [], // add imgs to formData to store multiple image urls
  };

  const [UpdateData, setFormData] = useState(initialUpdateData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  //---------------------------------------------------------------------------------------------






  //--------------------------------submit update---------------------------------
  const [per, setPer] = useState(null);
  const [loading, setLoading] = useState(false);



  const perRef = useRef(null); // create a mutable ref variable for the progress percentage

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!UpdateData.Product_id) {
      alert("Please enter the Product_id");
      return;
    }
    if (!UpdateData.item_name) {
      alert("Please enter the item_name");
      return;
    }

    if (!UpdateData.description) {
      alert("Please enter the description");
      return;
    }
    if (!UpdateData.price || isNaN(UpdateData.price)) {
      alert("Please enter a number for the item price ");
      return;
    }
    if (!UpdateData.qty || isNaN(UpdateData.qty)) {
      alert("Please enter a number for the quantity");
      return;
    }
    if (!UpdateData.item_type) {
      alert("Please select a category");
      return;
    }
    if (!UpdateData.status) {
      alert("Please select a status type");
      return;
    }

    if (files.length === 0) {
      alert("Please select an image");
      return;
    }

    setLoading(true);

    const images = UpdateData.img ? UpdateData.img : [];

    try {
      const uploadTasks = files.map((file) => {
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            perRef.current = progress;
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              images.push(downloadURL);
              if (images.length === files.length) {
                const collectionRef = collection(db, "products");
                const docRef = doc(collectionRef, id);

                updateDoc(docRef, {
                  ...UpdateData,
                  img: images,
                  timeStamp: serverTimestamp(),
                })
                  .then(() => {
                    console.error(UpdateData);

                    setFormData(initialUpdateData);
                    setFiles([]);
                    document.getElementById("category").selectedIndex = 0;
                    alert(` Product have Updated succesfully and ID: ${id}`);
                    setLoading(false);
                  })
                  .catch((error) => {
                    console.error("Error updating document: ", error);
                    setLoading(false);
                  });
              }
            });
          }
        );

        return uploadTask;
      });

      await Promise.all(uploadTasks);
    } catch (error) {
      console.error("Error uploading image: ", error);
      setLoading(false);
    }
  };


  useEffect(() => {
    // update the state and trigger a re-render when the progress changes
    setPer(perRef.current);
  }, [perRef.current]);

  //---------------------------------------------------------------------------------------------
  const handleReset = () => {
    setFormData(initialUpdateData);
    setFiles([]);
    document.getElementById("category").selectedIndex = 0;

  };


  // category ------------------------------------------
  const [data, setData] = useState([]);

  //fetch categorys-----------

  const fetchData = () => {
    const unsub = onSnapshot(
      collection(db, "Product_Category"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return unsub;
  };

  //---------------------------------------------------------------------------------------------

  useEffect(() => {
    const unsub = fetchData();
    return () => {
      unsub();
    };
  }, []);

  //---------------------------------------------------------------------------------------------

  // const handleCategoryChange = (event) => {
  //   const selectedOption = data.find((item) => item.id === event.target.value);
  //   const category = selectedOption ? selectedOption.Cat_name : '';
  //   setFormData({ ...UpdateData, item_type: category });
  //   console.log(category);
  // }
  const handleCategoryChange = (event) => {
    const selectedOption = data.find((item) => item.Cat_name === event.target.value);
    const item_type_ref = selectedOption ? doc(db, "Product_Category", selectedOption.id) : null;
    setFormData({ ...UpdateData, item_type: item_type_ref });
    console.log(item_type_ref);
  };
  

  //---------------------------------------------------------------------------------------------

  //------------------cancles-------------------------
  const handleCancel = () => {
    setFormData(initialUpdateData);
    setFiles([]);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="popup-overlay">

      <div className="popup">

        <h1>Update Product </h1>


        <div className="full_from">

          <form onReset={handleReset} onSubmit={handleUpdate} onClose={handleCancel} >
            <div className="line_rows">

              <div className="top">

                <h1 className='details_tag'> details </h1>

                <div className="formInput">
                  <label htmlFor="file">
                    <DriveFolderUploadIcon className="icon" /> : Image
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFiles(Array.from(e.target.files))}
                    multiple
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <div className="mid">

                {files.length > 0 ? (
                  files.map((file) => (
                    <img
                      key={file.name}
                      src={URL.createObjectURL(file)}
                      alt=""
                      style={{ maxWidth: "100%", marginBottom: "10px" }}
                    />
                  ))
                ) : (
                  <img
                    src={
                      "/no-image-icon-0.jpg"
                    }
                    alt=""
                  />
                )}


              </div>



              {/*------------------------------------------------------------------*/}

              <div className="bot">
                <div className="formInput">
                  <label> Product Id : </label>
                  <input type="text" name="Product_id" value={UpdateData.Product_id} onChange={handleInputChange} placeholder="Enter Product Id...." />
                </div>

                <div className="formInput">
                  <label>Item Name : </label>
                  <input type="text" name="item_name" value={UpdateData.item_name} onChange={handleInputChange} placeholder="Enter Product Name...." />
                </div>

                <div className="formInput">
                  <label>Price (RS) : </label>
                  <input type="text" name="price" value={UpdateData.price} onChange={handleInputChange} placeholder="Enter Product Price...." />
                </div>

                <div className="formInput">
                  <label>Quantity : </label>
                  <input type="text" name="qty" value={UpdateData.qty} onChange={handleInputChange} placeholder="Enter Product Quantity...." />
                </div>

                <div className="formInput">
                  <div className="Item_Type">
                    <label htmlFor="item_type">Category:</label>
                    <select id="category" name="category" className="P_cat" onChange={handleCategoryChange}>
                      <option value=""> </option>
                      {/* <option value={formData.item_type}> </option> */}
                      {data.map((item) => (
                        <option key={item.Cat_name} value={item.Cat_name} >

                          {item.Cat_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>


                <div className="status" >
                  <label> status </label>
                  <div className="line_height" style={{ display: "flex", alignItems: "center" }}>
                    <label style={{ marginRight: "20px" }}>
                      <input
                        type="radio"
                        name="status"
                        value="In Stock"
                        checked={UpdateData.status === "In Stock"}
                        onChange={handleInputChange}
                      />
                      In&nbsp;Stock
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="status"
                        value="Out Of Stock"
                        checked={UpdateData.status === "Out Of Stock"}
                        onChange={handleInputChange}
                      />
                      Out&nbsp;Of&nbsp;Stock
                    </label>
                  </div>
                </div>



                <div className="formInput">
                  <label>Description</label>
                  <textarea
                    className="Description"
                    name="description"
                    value={UpdateData.description}
                    onChange={handleInputChange}
                    placeholder="Enter Product Description...."
                  ></textarea>
                </div>


              </div>

              <div className="buttons">
                <button type="submit" className="submit"> Update </button>
                <button type="reset" className="reset">  Clear </button>
                <button onClick={onClose}  >Cancel</button>
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default UpdatePopup;
