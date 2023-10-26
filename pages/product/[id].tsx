import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { fetchProduct } from '../../api/product';
import CartButton from '../../components/CartButton';
import { useCart } from '../../components/CartContext';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { Product } from '../../models/Product';

const ProductPageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

const productStyles = {
  padding: '16px',
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
};

const ProductContainer = styled(Box)(productStyles);

const nameStyles = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '8px',
};

const imageStyles = {
  width: '300px',
  height: '300px',
  marginBottom: '16px',
};

const descriptionStyles = {
  fontSize: '1rem',
  marginBottom: '16px',
};

const priceStyles = {
  color: 'green',
  fontSize: '1.25rem',
  marginBottom: '16px',
};

const ratingStyles = {
  fontSize: '1rem',
  marginBottom: '16px',
};

const buttonStyles = {
  background: 'green',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  cursor: 'pointer',
  fontSize: '1.25rem',
  transition: 'background-color 0.3s',
  '&:hover': {
    background: 'darkgreen',
  },
};

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      fetchProduct(+id)
        .then((data) => setProduct(data))
        .catch((error) => console.error(error));
    }
  }, [id]);

  const { dispatch } = useCart();

  const addToCart = (productId: number, quantity: number) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { productId, quantity },
    });

    alert('Product added to cart');
  };

  if (!product) {
    return <div>Loading...</div>;
  } else {
    return (
      <ProductPageContainer>
        <Link href="/products" style={{ marginBottom: '20px' }}>
          <>Go to products</>
        </Link>
        <CartButton />
        <ProductContainer>
          <Box sx={nameStyles}>{product.title}</Box>
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            style={imageStyles}
          />
          <Box sx={descriptionStyles}>{product.description}</Box>
          <Box sx={priceStyles}>${product.price}</Box>
          <Box sx={ratingStyles}>
            Rating: {product.rating.rate} ({product.rating.count} reviews)
          </Box>
          <Button
            onClick={() => addToCart(product.id, 1)}
            sx={buttonStyles}
          >
            Add to Cart
          </Button>
        </ProductContainer>
      </ProductPageContainer>
    );
  }
};

export default ProductPage;