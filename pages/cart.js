import React from 'react';
import Cart from '../components/Cart';

const CartPage = ({ cartItems, onAddToCart }) => {
  return (
    <div>
      <Cart items={cartItems} onAddToCart={onAddToCart}/>
    </div>
  );
};

export default CartPage;