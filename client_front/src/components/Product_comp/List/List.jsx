import './List.scss';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import Card from '../Card/Card';

const List = ({ catId, maxPrice, sort, selectedCategories }) => {

  const [products, setProducts] = useState([]);

 

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
  
  
  return (
    <div className='List'>
      {products.map((product) => (
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
  );
};

export default List;
