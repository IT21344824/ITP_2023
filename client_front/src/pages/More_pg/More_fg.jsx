import React from 'react'
import MSlider from '../../components/MorePageSlider/MorePageSlider'
import AboutUs from '../../components/about_us/AboutUs'
import ContactUs from '../../components/contact_us/ContactUs'
import Apply_from from '../../components/Applycation_f_comp/Apply_from'
import './More_fg.scss'
//notify-
//import NofitySuc from "../../../components/notify_status/nofity";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//--


const More_fg = () => {

     //nofify--
     const notifyStyle = {
        whiteSpace: 'pre-line'
    }
    const progressStyle = {
        background: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)'
    }

    //---
    
  return (
    <div className='More_fg'>

        <div className="top"> <MSlider/> </div>
        <div className="about_us"> <AboutUs/> </div>
        <div className="contact_us"> <ContactUs/> </div>
        <div className="apply_from"> <Apply_from/> </div>


        <ToastContainer
                position="top-right"
                autoClose={5000}
                limit={6} //-
                hideProgressBar={false}
                newestOnTop={false} //-
                closeOnClick
                rtl={false} //--
                pauseOnFocusLoss //--
                draggable
                pauseOnHover
                theme="colored"
                style={notifyStyle} 
                 // progressStyle={progressStyle}
            />
    </div>
  )
}

export default More_fg
