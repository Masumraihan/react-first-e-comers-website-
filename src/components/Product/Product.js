import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = (props) => {
    //console.log(props);
    const {img,name,seller,price,stock,key} = props.name;
    return (
        <div className='product'>
            <div className="image">
                <img src={img} alt=""/>
            </div>
            <div className='details'>
                <h4 className='title'><Link to={"/product/"+key}>{name}</Link></h4>
                <p><small>Seller: {seller}</small></p>
                <p>price: ${price}</p>
                <p><small>stock: {stock} Order soon</small></p>
                { props.showAddToCart === true && <button className='main_btn' onClick={() => props.handleAddProduct(props.name)}> add to cart</button>}
            </div>
        </div>
    );
};

export default Product;