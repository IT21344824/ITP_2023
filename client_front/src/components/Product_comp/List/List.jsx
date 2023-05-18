import './List.scss';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import Card from '../Card/Card';
import SearchIcon from '@mui/icons-material/Search';


const List = ({ catId, maxPrice, sort, selectedCategories }) => {

  const [products, setProducts] = useState([]);

  const [searchQuery, setSearchQuery] = useState(""); //search


  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'products'),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          if (selectedCategories.length === 0 || selectedCategories.includes(data.item_type.id)) {
            if (!maxPrice || parseInt(data.price) <= parseInt(maxPrice)) {
              list.push({ id: doc.id, ...data });
            }
          }
        });

        // Apply sorting based on the sort prop
        if (sort === 'asc') {
          list = list.sort((a, b) => a.price - b.price);
        } else if (sort === 'desc') {
          list = list.sort((a, b) => b.price - a.price);
        }

        setProducts(list);
      }, (error) => {
        console.log(error);
      });

    return () => {
      unsub();
    };
  }, [selectedCategories, maxPrice, sort]);


  //--------------search bar----------------------------


  //all date or search by name / id
  const filteredData = products.filter((row) =>
    searchQuery === "" ||
    ["Product_id", "item_name"].some(
      (field) =>
        row[field] && row[field].toString().toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
    )
  );



  return (
    <div className='list_container'>
      <div className="search_table">
        <div className="from_search" id="from_search">
          <input
            type="text"
            placeholder="search Product.."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            
          />
          <div className="s_button" id="s_button" >
            <SearchIcon className='search_icon' />
            {/* <i className='search_icon'>H</i> */}
           
          </div>
        </div>
      </div>
      {filteredData.length === 0 ? (
        <p> No Products in that Name or ID </p>
      ) : (
        <div className="List">
          {filteredData.map((product) => (
            <Card
              key={product.id}
              item={{
                id: product.id,
                Product_id: product.Product_id,
                img: [product.img[0], product.img[1]].filter(Boolean),
                item_name: product.item_name,
                isNew: true,
                oldprice: 7567,
                price: product.price,
              }}
              productId={product.id}
            />
          ))}
        </div>
      )}
    </div>

  );
};

export default List;
