import React, { useEffect, useState } from 'react';
import { useCart, CartItem } from './CartContext';
import { fetchProduct } from '../api/product';
import { Box, Button } from '@mui/material';
import { Product } from '../models/Product';
import Image from 'next/image';

const CartContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const ProductItemStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '16px',
  border: '1px solid #ccc',
  padding: '8px',
};

const ProductImageContainer = {
  marginRight: '16px',
};

const RemoveButtonStyle = {
  background: 'red',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  cursor: 'pointer',
  '&:hover': {
    background: 'darkred',
  },
};

interface CartPageProps {
  products: Product[];
  onAddToCart: (product: Product[]) => void;
}

const CartContainer = ({ children }: { children: React.ReactNode }) => (
  <Box sx={CartContainerStyle}>
    {children}
  </Box>
);

const ProductItem = ({ children }: { children: React.ReactNode }) => (
  <Box sx={ProductItemStyle}>
    {children}
  </Box>
);

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
  <Box sx={ProductImageContainer}>
    <Image src={src} alt={alt} width={100} height={100} />
  </Box>
);

const RemoveButton = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
  <Button sx={RemoveButtonStyle} onClick={onClick}>
    {children}
  </Button>
);

const CartPage: React.FC<CartPageProps> = () => {
  const { state: { cart }, dispatch } = useCart();
  const [cartWithProductInfo, setCartWithProductInfo] = useState<Product[]>([]);

  const fetchProductInfo = async (cartItem: CartItem) => {
    const product = await fetchProduct(cartItem.productId);
    return { ...product, quantity: cartItem.quantity };
  };

  useEffect(() => {
    const populateCartWithProductInfo = async () => {
      const updatedCart = await Promise.all(
        cart.map(fetchProductInfo)
      );
      setCartWithProductInfo(updatedCart);
    };

    populateCartWithProductInfo();
  }, [cart]);

  const handleRemoveItem = (item: Product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId: item.id } });
  };

  return (
    <CartContainer>
      <h1>Cart</h1>
      {cartWithProductInfo.map((item: Product) => (
        <ProductItem key={item?.id}>
          {item?.image && (
            <ProductImage src={item.image} alt={item.title} />
          )}
          <div>
            {item && (
              <>
                <h2>{item.title}</h2>
              </>
            )}
            <p>Quantity: {cart.find((cartItem) => cartItem.productId === item.id)?.quantity}</p>
          </div>
          <RemoveButton onClick={() => handleRemoveItem(item)}>Remove</RemoveButton>
        </ProductItem>
      ))}
    </CartContainer>
  );
};

export default CartPage;
