import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { db } from '../../../firebase';
import Card from '../Card/Card';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import "./FeaturedProduct.scss"

const FeaturedProduct = ({ type }) => {

    const [currentSlide, setCurrentSlide] = useState(0)
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
        setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1);
    };
    const nextSlider = () => {
        setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1);
    };

    return (
        <div className='featuredproduct'>
            <div className="top">
                <h1>{type} products</h1>
                <p>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                    The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,
                    content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as
                    their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved
                    over the years, sometimes by accident, sometimes on purpose
                </p>
            </div>
            <div className="bottom">
                <div className="icons">
                    <div className="icon" onClick={prevSlider}>
                        <KeyboardDoubleArrowLeftIcon />
                    </div>
                </div>
                <div className="f_scroll">
                    <div className="featured_map" style={{ transform: `translateX(-${currentSlide * 30}vw)` }}>
                        {newproducts.map(item => (
                          <span className="img"> <Card item={item} key={item.id}  /></span> 
                        ))}
                    </div>
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
