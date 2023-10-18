import React from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';

const CartButton = () => {
  return (
    <div style={{ float: 'right' }}>
      <Link href="/cart">
        <Button variant="outlined" color="primary">
          Go to My Cart
        </Button>
      </Link>
    </div>
  );
};

export default CartButton;