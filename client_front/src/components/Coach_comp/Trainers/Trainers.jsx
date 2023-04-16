import React, { useEffect, useState } from 'react';
import { collection, onSnapshot,query,where } from 'firebase/firestore';
import { db } from '../../../firebase';
import './Trainers.scss';

const Trainers = () => {
  const [Coaches, setCoaches] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'Coaches'),
        
      ),
      snapshot => {
        const CoachesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCoaches(CoachesData);
      }
    );

    return unsubscribe;
  }, []);

  // const trainers = [
  //   {
  //     name: 'Trainer 1',
  //     imageSrc: 'path/to/trainer-image-1.png',
  //     description: 'Trainer 1 description goes here.',
      
  //   },
  //   {
  //     name: 'Trainer 2',
  //     imageSrc: 'path/to/trainer-image-2.png',
  //     description: 'Trainer 2 description goes here.',
      
  //   },
  //   {
  //     name: 'Trainer 3',
  //     imageSrc: 'path/to/trainer-image-3.png',
  //     description: 'Trainer 3 description goes here.',
      
  //   }
  // ];

  return (
    <div className="trainers-wrapper">
      <div className="trainers-header">
        <h2>Our Trainers</h2>
        <p> our experienced and qualified trainers</p>
      </div>
      <div className="trainers-grid">
        {Coaches.map(trainer => (
          <div className="trainer-card" key={trainer.Coach_name}>
            <img src={trainer.img} alt={trainer.Coach_name} />
            <h3>{trainer.Coach_name}</h3>
            <p>{trainer.description}</p>
            <button>Learn More</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trainers;
