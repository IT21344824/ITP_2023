import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../../../firebase';
import Card from '../Card/Card';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import "./FeaturedProduct.scss"

const FeaturedProduct = ({ type }) => {

    const [currentSlide, setCurrentSlide] = useState(0)
    const [newproducts, setNewProducts] = useState([])

    //get products after prevous month
    useEffect(() => {
        const fetchData = async () => {
            const today = new Date();
            const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));
            const prevMonthQuery = query(
                collection(db, 'products'),
                where('timeStamp', '>', prevMonth)
            );

            const unsub = onSnapshot(prevMonthQuery, (snapshot) => {
                let list = []
                snapshot.docs.forEach(doc => {
                    list.push({ id: doc.id, ...doc.data() })
                });
                setNewProducts(list);
            }, (error) => {
                console.log(error);
            });

            return () => {
                unsub();
            }
        };

        fetchData();
    }, []);


    const prevSlider = () => {
        setCurrentSlide(currentSlide === 0 ?  newproducts.length/4 : (prev) => prev - 1);
    };

    const nextSlider = () => {
        setCurrentSlide(currentSlide ===  newproducts.length/4 ? 0 : (prev) => prev + 1);
    };

    //   const prevSlider = () => {
    //     setCurrentSlide(currentSlide === 0 ? newproducts.length - 1 : currentSlide - 1);
    //   };
    
    //   const nextSlider = () => {
    //     setCurrentSlide(currentSlide === newproducts.length - 1 ? 0 : currentSlide + 1);
    //   };


    //get details---------------------------------------------------------------------------------------------------------------------------------

    const _id = "HomePageEdit";

    //geting selected data
    const [data, setData] = useState({});


    useEffect(() => {
        const docRef = doc(db, "client_home_pg", _id);

        const unsubscribe = onSnapshot(docRef, async (doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setData(data);
            } else {
                console.log("No such document!");
            }
        }, (error) => {
            console.log("Error getting document:", error);
        });

        // unsubscribe from the listener when the component unmounts
        return () => unsubscribe();
    }, [_id]);

    return (
        <div className='featuredproduct'>
            <div className="top">
                <h1> {type} products</h1>
                <p> {data.LP_description} </p>
            </div>


            <div className="bottom">
                <div className="icons">
                    <div className="icon" onClick={prevSlider}>
                        <KeyboardDoubleArrowLeftIcon />
                    </div>
                </div>

                <div className="f_scroll">
                    {/* {newproducts.length === 0 ? (
                        <p> No new Products  </p>
                    ) : ( */}
                        <div className="featured_map" style={{ transform: `translateX(-${currentSlide * 30}vw)` }}>
                            {newproducts?.map(item => (
                                <span className="img" key={item.id}>
                                    <Card item={item} key={item.id}  productId={item.id}/>                                   
                                </span>
                            ))}
                        </div>
                    {/* )} */}
                </div>

                <div className="icons">
                    <div className="icon" onClick={nextSlider}>
                        <KeyboardDoubleArrowRightIcon />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default FeaturedProduct
