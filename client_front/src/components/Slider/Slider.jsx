import React, { useState } from 'react'
import  './slider.scss'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';



const Slider = () => {

    const [currentSlide , setCurrentSlide ] = useState(0)

    const data = [
        "home_page/fitness-woman-body-slide1 .jpg",
        "home_page/issa-structure-gym-workout.jpg",
        "home_page/fitness-man-body-slide2.jpg",
    ];

    const prevSlider =() =>{
        setCurrentSlide(currentSlide === 0 ? 2 : (prev) => prev - 1 );
    };
    const nextSlider =() =>{
        setCurrentSlide(currentSlide === 2 ? 0 : (prev) => prev + 1 );
    };


  return (
    <div className='slider'>
        <div className="container" style={{ transform : `translateX(-${currentSlide * 100}vw)`}}>
            <img src={data[0]} alt="" />
            <img src={data[1]} alt="" />
            <img src={data[2]} alt="" />
        </div>
        <div className="icons">
            <div className="icon" onClick={prevSlider}>
                <KeyboardDoubleArrowLeftIcon/>
            </div>
            <div className="icon" onClick={nextSlider}>
                <KeyboardDoubleArrowRightIcon/>
            </div>
        </div>
      
    </div>
  )
}

export default Slider
