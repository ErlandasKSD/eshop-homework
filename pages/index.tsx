import React from 'react';
import Link from 'next/link';
import { styled } from '@mui/material/styles';

const HomeContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '100px',
});

const Button = styled('button')({
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
});

const Index: React.FC = () => {
  return (
    <HomeContainer>
      <h1>My simple e-shop homework</h1>
      <Link href="/products">
        <Button>Go to Products</Button>
      </Link>
      <Link href="/cart">
        <Button>Go to Cart</Button>
      </Link>
    </HomeContainer>
  );
};

export default Index;
