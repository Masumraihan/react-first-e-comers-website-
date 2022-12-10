import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from 'react-router-dom';

const Shop = () => {
    //console.log(fakeData);
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previewsCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        })
        setCart(previewsCart);
    },[])

    const handleAddProduct = (name) => {
        const toBeAddedKey = name.key;
        let count = 1;
        let newCart;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        if (sameProduct) {
             count = sameProduct.quantity + 1;
             sameProduct.quantity = count;
             const other = cart.filter(pd => pd.key !== toBeAddedKey);
             newCart = [...other,sameProduct];
        }
        else {
            name.quantity = 1;
            newCart = [...cart,name];
        }
        setCart(newCart);
        addToDatabaseCart(name.key, count);
    }
    return (
        <div className='shop_container'>
            <div className="product_container">
                {
                    products.map(pd => <Product
                        key={pd.key}
                        showAddToCart={true}
                        handleAddProduct={handleAddProduct}
                        name={pd}>
                    </Product>) 
                }
            </div>
            <div className="cart_container">
                <Cart cart={cart}>
                    <Link>
                        <button className='btn'>Review</button>
                    </Link>
                </Cart>
            </div>

        </div>

    );
};

export default Shop;