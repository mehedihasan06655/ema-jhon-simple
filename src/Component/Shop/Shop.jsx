import React, { useEffect, useState } from 'react';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';

const Shop = () => {
    const [products,setProducts] = useState([])
    const [cart,setCart] = useState([])
    useEffect(()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])

    useEffect( ()=>{
        const storedProduct = getShoppingCart();
        //step: 1getId
        const saveCart = [];
        for(const id in storedProduct){
        //step: 2 get the product using id;
        const addedProduct = products.find(product => product.id === id);
        if(addedProduct){
            //step:3 add quantity
            const quantity = storedProduct[id];
            addedProduct.quantity = quantity;
            //step: 4 add the added product to the saved cart
            saveCart.push(addedProduct);
        }
        }
        setCart(saveCart)
    },[products])

    const handleAddToCart = (product) =>{
        // const newCart = [...cart,product];
        let newCart = [];
        const exists = cart.find(pd => pd.id === product.id);
        if(!exists){
            product.quantity= 1;
            newCart = [...cart,product];
        }
        else{
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists];
        }
        
        setCart(newCart);
        addToDb(product.id)
    }

    return (
        <div className='shop-container'>
            <div className='products-container'>
                {products.map(product=><Product
                key={product.id}
                product = {product}
                handleAddToCart = {handleAddToCart}
                ></Product>)}
            </div>
            <div className='cart-container'>
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;