import React from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const buttonStyles: React.CSSProperties = {
  float: 'right',
};

const CartButton: React.FC = () => {
  return (
    <Box sx={buttonStyles}>
      <Link href="/cart">
        <Button sx={buttonStyles} variant="outlined" color="primary">
          Go to My Cart
        </Button>
      </Link>
    </Box>
  );
};

export default CartButton;
