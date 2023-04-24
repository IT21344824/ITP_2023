import React, { useState, useEffect } from 'react'
import './MorePageSlider.scss'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { db } from '../../firebase';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';


const MorePageSlider = () => {

    const [currentSlide, setCurrentSlide] = useState(0)

    const data = [
        "home_page/fitness-woman-body-slide1 .jpg",
        "home_page/issa-structure-gym-workout.jpg",
        "home_page/fitness-man-body-slide2.jpg",
    ];

    const prevSlider = () => {
        setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1);
    };
    const nextSlider = () => {
        setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1);
    };

    const getprevSlider = () => {
        // Use the length of the Sliderdata.img array to determine the new slide index
        setCurrentSlide(currentSlide === 0 ? Sliderdata.img.length - 1 : (prev) => prev - 1);
    };
    const getnextSlider = () => {
        // Use the length of the Sliderdata.img array to determine the new slide index
        setCurrentSlide(currentSlide === Sliderdata.img.length - 1 ? 0 : (prev) => prev + 1);
    };

    //get details---------------------------------------------------------------------------------------------------------------------------------

    const _id = "MorePageSlider";

    //geting selected data
    const [Sliderdata, setData] = useState({});


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
        <div className='MorePageSlider'>
            {Sliderdata.img && Sliderdata.img.length > 0 ? (
                <div className="container" style={{ transform: `translateX(-${currentSlide * 100}vw)` }}>
                    {Sliderdata.img.map((img, index) => (
                        <img key={index} src={img} alt="" />
                    ))}
                </div>
            ) : (
                <div className="container" style={{ transform: `translateX(-${currentSlide * 100}vw)` }}>
                    {data.map((img, index) => (
                        <img key={index} src={img} alt="" />
                    ))}
                </div>
            )}

            {Sliderdata.img && Sliderdata.img.length > 0 ? (
                <div className="icons">
                    <div className="icon" onClick={getprevSlider}>
                        <KeyboardDoubleArrowLeftIcon />
                    </div>
                    <div className="icon" onClick={getnextSlider}>
                        <KeyboardDoubleArrowRightIcon />
                    </div>
                </div>
            ) : (
                <div className="icons">
                    <div className="icon" onClick={prevSlider}>
                        <KeyboardDoubleArrowLeftIcon />
                    </div>
                    <div className="icon" onClick={nextSlider}>
                        <KeyboardDoubleArrowRightIcon />
                    </div>
                </div>
            )}

            {/*             
            <div className="icons">
                <div className="icon" onClick={prevSlider}>
                    <KeyboardDoubleArrowLeftIcon />
                </div>
                <div className="icon" onClick={nextSlider}>
                    <KeyboardDoubleArrowRightIcon />
                </div>
            </div> */}
        </div>
    )
}

export default MorePageSlider
