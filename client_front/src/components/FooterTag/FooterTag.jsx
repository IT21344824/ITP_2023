import React from 'react'
import "./FooterTag.scss"
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GoogleIcon from '@mui/icons-material/Google';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

const FooterTag = () => {
  return (
    <div className='footertag'>
        <div className="wrapper">
            <span> Join With Us</span>
        <div className="icons">
            <FacebookIcon/>
            <InstagramIcon/>
            <WhatsAppIcon/>
            <GoogleIcon/>
            <TravelExploreIcon/>
        </div>
        </div>
      
    </div>
  )
}

export default FooterTag
