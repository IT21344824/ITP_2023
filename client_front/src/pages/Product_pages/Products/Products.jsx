import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import List from '../../../components/Product_comp/List/List'
import './products.scss'

const Products = () => {

  //const catId = parseInt(useParams().id);

  const [catId, setCatId] = useState([]);
  const [maxPrice, setMaxPrice] = useState(100);
  const [sort, setSort] = useState(null);
  const [catData, setCatData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Fetch category data from Firebase on component mount
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "Product_Category"),
      (snapshot) => {
        let list = []
        snapshot.docs.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() })
        });
        setCatData(list);
        
      }, (error) => {
        console.log(error);
      });
    return () => {
      unsub();
    }
  }, []);

  // Render filter items based on category data


  //console.log(catId) - wada 
  //console.log(selectedCategories) - wada


  return (
    <div className='products'>
      <div className="left">

        <div className="filterItems">
          <h2>Product Categories</h2>
          {catData.map((cat) => (
            <div className="inputItem" key={cat.id}>
              <input
                type="checkbox"
                id={cat.id}
                value={cat.id}
                checked={selectedCategories.includes(cat.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCategories([...selectedCategories, cat.id]);
                  } else {
                    setSelectedCategories(
                      selectedCategories.filter((id) => id !== cat.id)
                    );
                  }
                }}
              />
              <label htmlFor={cat.id}>{cat.Cat_name}</label>
            </div>
          ))}

        </div>

        <div className="filterItems">
          <h2> Filter by price </h2>
          <div className="inputItem">
            <span>0</span>
            <input type="range" min={0} max={5000} onChange={(e) => setMaxPrice(e.target.value)} />
            <span> {maxPrice} </span>
          </div>

        </div>
        <div className="filterItems">
          <h2> Sort by </h2>
          <div className="inputItem">
            <input type="radio" id='asc' value="asc" name="price" onChange={e => setSort("asc")} />
            <label htmlFor="asc"> Price (Lowest first )</label>
          </div>
          <div className="inputItem">
            <input type="radio" id='desc' value="desc" name="price" onChange={e => setSort("desc")} />
            <label htmlFor="desc"> Price (Highest first )</label>
          </div>
        </div>
      </div>

      <div className="right">
        <img
          className='catImg'
          src="/products/banner.jpg"
          alt="" />

        <List
          catId={catId}
          maxPrice={maxPrice}
          sort={sort}
          selectedCategories={selectedCategories}
        />
      </div>

    </div>
  )
}

export default Products
