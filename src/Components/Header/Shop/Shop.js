import React, { useState } from 'react';
import fakeData from '../../../fakeData';
import { addToDatabaseCart } from '../../../utilities/databaseManager';
import Cart from '../../Cart/Cart';
import Product from '../../Product/Product';
import './Shop.css'

const Shop = () => {
    const first10 = fakeData.slice(0, 30)
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([])

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === product.key)
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey)
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        
        addToDatabaseCart(product.key, count)
    } 

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map(pd => <Product
                        key={pd.key}
                        showAddToCart={true}
                        handleAddProduct = {handleAddProduct}
                        product={pd}
                        ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>

    );
};

export default Shop;