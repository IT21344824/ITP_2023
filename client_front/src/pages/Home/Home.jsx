import React from 'react'
import FooterTag from '../../components/FooterTag/FooterTag'
import Slider from '../../components/Slider/Slider'
import './home.scss'

// products manage--
import FeaturedProduct from '../../components/Product_comp/FeaturedProducts/FeaturedProduct'

const Home = () => {


  return (
    <div className='home'>
      <Slider />
      <FeaturedProduct type="Latest" />

      <div className="video">
        <div className="youtube-video-container">
          <h1> how stay healthy </h1>

          <iframe width="560" height="315"
            src="https://www.youtube.com/embed/aaNhNDYRdQE"
            title="YouTube Video" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>

        </div>

        <div className="youtube-video-container">
          <h1> healthy drinks </h1>

          <iframe width="560" height="315"
            src="https://www.youtube.com/embed/DEiueXH--HI"
            title="YouTube Video" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>

        </div>
       

        <div className="youtube-video-container">
          <h1> how gain muscles </h1>

          <iframe width="560" height="315"
            src="https://www.youtube.com/embed/MilYefF9DjI"
            title="YouTube Video" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>

        </div>

        


      </div>


      <FooterTag />

    </div>
  )
}

export default Home
