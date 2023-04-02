import React from 'react';
import './Card.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Card = ({ item, productId }) => {

    return (
        <Link className='link' to={`/Products/${productId}`} state={{ productId}}>
            <div className='card'>
                <h2 className='h2_id'>{item.Product_id}</h2>

                <div className="image">
                    {item.attributes && item.attributes.isNew && <span>New Season</span>}
                    <img src={item.img[0]} alt="" className='mainImg' />
                    {item.img[1] && <img src={item.img[1]} alt="" className='secondImg' />}

                </div>

                <h2>{item.item_name}</h2>
                <div className="prices">
                    <h3>Rs:{item.oldprice}</h3>
                    <h3>Rs:{item.price}</h3>
                </div>
            </div>
        </Link>
    );
};

export default Card;
