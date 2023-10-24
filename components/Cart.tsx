import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { fetchProduct } from '../api/product';

const CartContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const ProductItem = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  margin: '16px',
  border: '1px solid #ccc',
  padding: '8px',
};

const ProductImage = {
  width: '100px',
  height: '100px',
  marginRight: '16px',
};

const RemoveButton = {
  background: 'red',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  cursor: 'pointer',
  '&:hover': {
    background: 'darkred',
  },
};

const CartPage: React.FC = () => {
  const { state: { cart }, dispatch } = useCart();
  const [cartWithProductInfo, setCartWithProductInfo] = useState<any[]>([]);

  const fetchProductInfo = async (item: any) => {
    const product = await fetchProduct(item.productId);
    return { ...item, product };
  };

  useEffect(() => {
    const populateCartWithProductInfo = async () => {
      const updatedCart = await Promise.all(cart.map(async (item: any) => {
        return await fetchProductInfo(item);
      }));
      setCartWithProductInfo(updatedCart);
    };

    populateCartWithProductInfo();
  }, [cart]);

  const handleRemoveItem = (item: any) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId: item.productId } });
  };

  return (
    <CartContainer>
      <h1>Cart</h1>
      {cartWithProductInfo.map((item: any) => (
        <ProductItem key={item.product?.id} sx={{ alignItems: 'center' }}>
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