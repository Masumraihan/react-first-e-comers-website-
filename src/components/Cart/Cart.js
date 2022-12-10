import React from 'react';
import './cart.css'

const Cart = (props) => {
    const cart = props.cart;
    //console.log(cart);
    //const total = cart.reduce( (total,prd) => total + prd.price, 0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
    }
    let shipping = 12.99;
    if(total > 100){
        shipping = 1.99;
    }
    else if(total > 50){
        shipping = 4.99;
    }
    else if(total > 15){
        shipping = 8.99;
    }
    const orderItems = cart.length;
    const tax = total / 10;
    const productPrice = total.toFixed(2)
    const getNumber = (num) => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    const grandTotal = shipping + tax + total;
    return (
        <div className='cart_component'>
            <h2>Order Summary</h2>
            <h4>Items Ordered : {orderItems}</h4>
            <p>Shipping Cost : ${shipping}</p>
            <p>Tax: ${getNumber(tax)}</p>
            <h5>Product Price: ${productPrice}</h5>
            <p>Total : ${getNumber(grandTotal)}</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;