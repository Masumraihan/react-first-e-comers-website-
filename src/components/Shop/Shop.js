import React, { useState } from 'react';
import fakeData from '../../fakeData'
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    console.log(fakeData);
    const first10 = fakeData.slice(0,10);
    const [products,setProducts] = useState(first10);
    const [cart,setCart] = useState([])

    const handleAddProduct = (name) => {
        const newCart = [...cart,name];
        setCart(newCart);
    }
    return (
        <div className='shop_container'>
            <div className="product_container">
                {
                    products.map(pd => <Product
                        handleAddProduct = {handleAddProduct} 
                        name={pd}>
                        </Product>)
                }
            </div>
            <div className="cart_container">
                <Cart cart = {cart}></Cart>
            </div>
                
        </div>
        
    );
};

export default Shop;