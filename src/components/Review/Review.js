import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';

const Review = () => {
    const [cart,setCart] = useState([]);
    useEffect(()=> {
        //cart
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart)
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        })
        //console.log(cartProducts);
        setCart(cartProducts);
    },[])
    return (
        <div>
            {
                cart.map(pd => <ReviewItem 
                    key = {pd.key}
                    product = {pd}></ReviewItem>)
            }
        </div>
    );
};

export default Review;