import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useCart } from './CartContext';
import { fetchProduct } from '../api/product';

const CartContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const ProductItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '16px',
  border: '1px solid #ccc',
  padding: '8px',
});

const ProductImage = styled('img')({
  width: '100px',
  height: '100px',
  marginRight: '16px',
});

const RemoveButton = styled('button')({
  background: 'red',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  cursor: 'pointer',
  '&:hover': {
    background: 'darkred',
  },
});

const CartPage = () => {
  const { state: { cart }, dispatch } = useCart();

  const [cartWithProductInfo, setCartWithProductInfo] = useState([]);

  const fetchProductInfo = async (item) => {
    const product = await fetchProduct(item.productId);
    return { ...item, product };
  };

  useEffect(() => {
    const populateCartWithProductInfo = async () => {
      const updatedCart = await Promise.all(cart.map(async (item) => {
        return await fetchProductInfo(item);
      }));
      setCartWithProductInfo(updatedCart);
    };

    populateCartWithProductInfo();
  }, [cart]);

  const handleRemoveItem = (item) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId: item.productId } });
  };

  return (
    <CartContainer>
      <h1>Cart</h1>
      {cartWithProductInfo.map((item) => (
        <ProductItem key={item.product?.id}>
          {item.product?.image && (
            <ProductImage src={item.product.image} alt={item.product.title} />
          )}
          <div>
            {item.product && (
              <>
                <h2>{item.product.title}</h2>
              </>
            )}
            <p>Quantity: {item.quantity}</p>
          </div>
          <RemoveButton onClick={() => handleRemoveItem(item)}>Remove</RemoveButton>
        </ProductItem>
      ))}
    </CartContainer>
  );
};

export default CartPage;