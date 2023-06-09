import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css'
import { removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const saveCart = useLoaderData()
    const [cart, setCart] =useState(saveCart)

    const hanleRemoveFromCart = (id) => {
        const remaining = cart.filter(product => product.id !== id);
        setCart(remaining);
        removeFromDb(id);
    }

    console.log(saveCart)
    return (
        <div className='shop-container'>
            <div className='review-container'>
                {cart.map(product => <ReviewItem
                key={product.id}
                product = {product}
                hanleRemoveFromCart = {hanleRemoveFromCart}
                />)}
            </div>
            <div className='cart-container'>
                <Cart cart={cart}/>
            </div>
        </div>
    );
};

export default Orders;