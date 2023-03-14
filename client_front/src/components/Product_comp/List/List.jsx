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
          list.push({ id: doc.id, ...doc.data() });
        });
        setProducts(list);

      }, (error) => {
        console.log(error);
      });
    return () => {
      unsub();
    };
  }, []);


  const filteredProducts = products
  .filter((product) =>
    (selectedCategories.length === 0 || product.Product_category?.some((categoryId) => selectedCategories.includes(categoryId))) &&
    (catId.length === 0 || product.Product_category?.some((categoryId) => catId.includes(categoryId)))
  )
  
  // console.log(products.img)

  return (
    <div className='List'>
      {filteredProducts.map((product) => (
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
