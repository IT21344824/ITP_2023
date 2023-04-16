import React, { useEffect, useState } from 'react';
import { collection, onSnapshot,query,where } from 'firebase/firestore';
import { db } from '../../../firebase';
import SearchIcon from '@mui/icons-material/Search';

const BPackage = () => {

    const [Bpackages, setBPackages] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
          query(
            collection(db, 'Packages'),
            where("Categories", "==", "BUNDLED PACKAGES")
          ),
          snapshot => {
            const packagesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBPackages(packagesData);
          }
        );
      
        return unsubscribe;
      }, []);
      

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {Bpackages.map(pkg => (
                <div key={pkg.id} style={{ marginRight: '40px', marginBottom: '20px', }}>
                    <img src={pkg.img[0]} alt="" style={{ width: '462px', height: '329', }} />
                </div>
            ))}
        </div>
    );


}

export default BPackage
