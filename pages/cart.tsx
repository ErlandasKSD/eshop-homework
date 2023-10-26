import React from 'react';
import CartPage from '../components/CartPage';
import { Product } from '../models/Product';

interface CartProps {
  products: Product[];
  onAddToCart: (product: Product[]) => void;
}

const Cart: React.FC<CartProps> = ({ products, onAddToCart }) => {
  return (
    <div>
      <CartPage products={products} onAddToCart={onAddToCart} />
    </div>
  );
}

export default Cart;