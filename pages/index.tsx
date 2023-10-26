import React from 'react';
import Link from 'next/link';
import { Box, Button } from '@mui/material';

const HomeContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '100px',
};

const ButtonStyle = {
  background: 'blue',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  margin: '10px',
  cursor: 'pointer',
  fontSize: '1rem',
  '&:hover': {
    background: 'darkblue',
  },
};

const Index: React.FC = () => {
  return (
    <Box sx={HomeContainer}>
      <h1>My simple e-shop homework</h1>
      <Link href="/products">
        <Button sx={ButtonStyle}>Go to Products</Button>
      </Link>
      <Link href="/cart">
        <Button sx={ButtonStyle}>Go to Cart</Button>
      </Link>
    </Box>
  );
};

export default Index;
