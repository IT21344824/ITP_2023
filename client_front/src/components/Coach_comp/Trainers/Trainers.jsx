import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../firebase';
import './Trainers.scss';
import { useNavigate,Link ,useLocation} from 'react-router-dom';

const Trainers = () => {

  const navigate = useNavigate();
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

  const handleClick = (e) => {
    e.preventDefault();

      navigate("/Trainer");
   
  };

  

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
            {/* <p>{trainer.description}</p> */}
            <Link to={`/trainer/${trainer.id}`} style={{ textDecoration: "none" }} state={{ id: trainer.id }}>
              <button className="viewButton"> View </button>
            </Link>
            {/* <button onClick={handleClick}>Learn More</button> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trainers;
