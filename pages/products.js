import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import CartButton from '../components/CartButton';
import { fetchProducts } from '../api/products';
import { saveCartToLocalStorage, loadCartFromLocalStorage } from '../api/cart';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <CartButton />
      <h1>Products</h1>
      <ProductList products={products}/>
    </div>
  );
};

export default ProductsPage;