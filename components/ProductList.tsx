import React from 'react';
import { Box, Button, Theme } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from './CartContext';

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductListProps {
  products: Product[];
}

const productList = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px',
};

const productStyles = {
  margin: '5px',
  width: '20%',
  height: '400px',
  padding: '16px',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
};

const nameStyles = {
  fontSize: '1.25rem',
  fontWeight: 'bold',
};

const priceStyles = {
  color: 'green',
};

const buttonStyles = {
  background: 'green',
  color: 'white',
  border: 'none',
  marginTop: '2%',
  padding: '10px 20px',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'background-color 0.3s',
  '&:hover': {
    background: 'darkgreen',
  }
};

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const { dispatch } = useCart();

  const addToCart = (productId: number, quantity: number) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { productId, quantity },
    });

    alert('Product added to cart');
  };

  return (
    <Box sx={productList}>
      {products.map((product) => (
        <Box key={product.id} sx={productStyles}>
          <Link href={`/product/${product.id}`}>
            <Image
              src={product.image}
              alt={product.title}
              width={200}
              height={200}
              loader={({ src }) => src}
            />
            <Box sx={nameStyles}>{product.title}</Box>
            <Box sx={priceStyles}>${product.price}</Box>
          </Link>
          <Button onClick={() => addToCart(product.id, 1)} sx={buttonStyles}>
            Add to Cart
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default ProductList;