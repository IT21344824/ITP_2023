import React, { useEffect, useState } from 'react';
import { onSnapshot, collection, query, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import './Trainer.scss';

const Trainer = () => {

    //geting id from http
    const location = useLocation();
    const _id = location.state.id;


    //geting selected data
    const [data, setData] = useState({});

    useEffect(() => {
        const docRef = doc(db, "Coaches", _id);

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

    //  useEffect(() => {
    //     const unsubscribe = onSnapshot(
    //       query(
    //         collection(db, 'Coaches' , _id),

    //       ),
    //       snapshot => {
    //         const CoachesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //         setData(CoachesData);
    //       }
    //     );

    //     return unsubscribe;
    //   }, []);
    return (
        <div className="trainer-wrapper">
            <div className="image-container">
                <img src={data.img} alt={data.Coach_name} />
            </div>

            <div className="info-container">
              
                <h2>Who Is Coach {data.Coach_name}? </h2>
               
            </div>
            <div className="description">
                <p>{data.description}</p>
            </div>
            <div className="trainer-details">
                <ul>
                    <li>Contact: {data.contact}</li>
                    
                </ul>
            </div>
        </div>
    )
}

export default Trainer

