import React from 'react'
import RoomIcon from '@mui/icons-material/Room';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import './AboutUs.scss'

const AboutUs = () => {
    return (
        <div className='AboutUs'>
            <h1> About Us </h1>
            <div className="wrapper">
                <div className="content">
                    <div className="top">
                        <div className="left">

                            <h3>From its medieval origins to the digital era, learn everything there is to know about the ubiquitous lorem ipsum passage</h3>

                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                        <div className="right">
                            <div className="img">
                                <img src="/home_page/blue.png" alt="" className='icons' />
                            </div>

                        </div>
                    </div>
                    <div className="follow">
                        <a href="">Follow us</a>
                    </div>
                    <div className="social">
                        <a href=""> <img src="/home_page/fb.png" alt="" className='icons' /> </a>
                        <a href=""> <img src="/home_page/insta.png" alt="" className='icons' /> </a>
                        <a href=""> <img src="/home_page/twitter.png" alt="" className='icons' /> </a>


                    </div>

                    <div className="contactInfo">

                        <div className="box">
                            <div className="icon"><RoomIcon /></div>
                            <div className="text">
                                <h3>Address</h3>
                                <p>Robert Robertson, 1234 NW Bobcat Lane, St. Robert, MO 65584-5678</p>
                            </div>
                        </div>

                        <div className="box">
                            <div className="icon phone"><LocalPhoneIcon /></div>
                            <div className="text phone">
                                <h3 >Phone</h3>
                                <p>+94 999 000 9999</p>
                            </div>
                        </div>

                        <div className="box">
                            <div className="icon"> <MailOutlineIcon /> </div>
                            <div className="text">
                                <h3>Email</h3>
                                <p>xxxxxxxxxxx@gmail.com</p>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default AboutUs
