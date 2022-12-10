import React from 'react';
import './ReviewItem.css'

const ReviewItem = (props) => {
    //console.log(props)
    const { name, quantity,img,key,price} = props.product;
    return (
        <div className='review_item'>
            <div>
                <img src={img} alt="" />
            </div>
            <div className='review_details'>
            <h4 className='reviewItem_title'>{name}</h4>
                <p> Quantity: {quantity}</p>
                <p><small>Price: ${price}</small></p>
                <button
                    onClick={() => props.removeProduct(key)}
                    className='btn'>Remove</button>
            </div>

        </div>
    );
};

export default ReviewItem;