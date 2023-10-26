import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import { Product } from '../models/Product';
import CartButton from '../components/CartButton';
import { fetchProducts } from '../api/products';

const Products: React.FC = () => {  
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <CartButton />
      <h1>Products</h1>
      <ProductList products={products} />
    </div>
  );
};

export default Products;