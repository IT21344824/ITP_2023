import React from 'react'
import FooterTag from '../../components/FooterTag/FooterTag'
import Slider from '../../components/Slider/Slider'
import './home.scss'

// products manage--
import FeaturedProduct from '../../components/Product_comp/FeaturedProducts/FeaturedProduct'

const Home = () => {
  return (
    <div className='home'>
      <Slider/>
      <FeaturedProduct type ="Latest"/>
      <FeaturedProduct type ="rending"/>
      <FooterTag/>
      
    </div>
  )
}

export default Home
