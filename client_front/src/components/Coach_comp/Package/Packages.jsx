import React, { useEffect, useState } from 'react';
import { collection, onSnapshot,query,where } from 'firebase/firestore';
import { db } from '../../../firebase';
import SearchIcon from '@mui/icons-material/Search';

const Packages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'Packages'),
        where("Categories", "==", "MONTHLY SUBSCRIPTION")
      ),
      snapshot => {
        const packagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(packages.img)

        setPackages(packagesData);
      }
    );

    return unsubscribe;
  }, []);


  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {packages.map(pkg => (
        <div key={pkg.id} style={{ marginRight: '40px', marginBottom: '20px', }}>
          <img src={pkg.img[0]} alt="" style={{ width: '520px', height: '174' }} />
        </div>
      ))}
    </div>
  );
};

export default Packages;



