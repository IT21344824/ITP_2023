import React from 'react';
import './Card.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import PaidIcon from '@mui/icons-material/Paid';

const Card = ({ item, productId }) => {

    return (
        <Link className='link' to={`/Products/${productId}`} state={{ productId }}>
            <div className='card' >
                <h2 className='h2_id'>{item.Product_id}</h2>

                <div className="image">
                    {item.attributes && item.attributes.isNew && <span>New Season</span>}
                    {item.img && item.img[0] && <img src={item.img[0]} alt="" className='mainImg' />}
                    {item.img && item.img[1] && <img src={item.img[1]} alt="" className='secondImg' />}
                </div>

                <h2>{item.item_name}</h2>
                <div className="prices">
                    <h3><PaidIcon /></h3>
                    <h3>Rs:{item.price}</h3>
                </div>
            </div>
        </Link>
    );
};

export default Card;
