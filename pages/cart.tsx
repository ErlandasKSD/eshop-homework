import React from 'react';
import Cart from '../components/Cart';
import { Product } from '../components/ProductList';

interface CartPageProps {
  cartItems: Product[];
  onAddToCart: (product: Product[]) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cartItems, onAddToCart }) => {
  return (
    <div>
      <Cart items={cartItems} onAddToCart={onAddToCart} />
    </div>
  );
};

export default CartPage;