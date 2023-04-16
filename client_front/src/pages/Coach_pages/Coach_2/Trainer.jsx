import React from 'react'
import './Trainer.scss';

const Trainer = () => {
    return (
        <div className="trainer-wrapper">
            <div className="image-container">
                <img src="/img/CoachBanner.jpg" alt="Trainer" />
            </div>
            <div className="info-container">
                <h2>Who Is Coach Thili ?</h2>
                <p>Trainer Title</p>
                <p>Trainer Location</p>
            </div>
            <div className="description">
                <p>Im an experienced physique class bodybuilder, focusing towards aesthetics / fat loss aspects for my online coaching clients. I have a proven track record of transforming individuals and helping them reach their full potential by creating fully customized training programs that meets my clients requirements, as well as a detailed diet plan to complement the workouts.
                    My passion is to make sure all my clients have a good scientific understanding of the fundamentals of fitness as a result of my full time commitment to help each and every client reach their ultimate potential.
                    My Vision: To transform my clients to achieve their dream body goal, whilst educating them at the same time.
                    My Mission: To provide a comprehensive program with my maximum dedication in order to make sure my clients efforts and money are well worth.
                    101 % Commitment guaranteed towards helping my clients reach their end goal.
                    I strive on educating my clients on the fitness process as much as transforming them. I firmly believe that knowledge is power, and look to impart my knowledge to my clients.
                    I can guarantee that with my knowledge, expertise and service the results will stand out as your expectations with the right discipline and mindset to back it up..</p>
            </div>
            <div className="trainer-details">
                <ul>
                    <li>Experience: X years</li>
                    <li>Specialization: Some specialization</li>
                    <li>Education: Some degree</li>
                </ul>
            </div>
        </div>
    )
}

export default Trainer

