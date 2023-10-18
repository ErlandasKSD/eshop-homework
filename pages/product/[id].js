import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { fetchProduct } from '../../api/product';
import CartButton from '../../components/CartButton';
import { useCart } from '../../components/CartContext';
import Link from 'next/link';

const ProductPageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

const Product = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  border: '1px solid #e0e0e0',
  borderRadius: theme.spacing(1),
}));

const ProductName = styled('div')(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(1),
}));

const ProductImage = styled(Image)({
  width: 300,
  height: 300,
  marginBottom: '16px',
});

const ProductDescription = styled('div')(({ theme }) => ({
  fontSize: '1rem',
  marginBottom: theme.spacing(2),
}));

const ProductPrice = styled('div')(({ theme }) => ({
  color: 'green',
  fontSize: '1.25rem',
  marginBottom: theme.spacing(2),
}));

const ProductRating = styled('div')(({ theme }) => ({
  fontSize: '1rem',
  marginBottom: theme.spacing(2),
}));

const AddToCartButton = styled('button')(({ theme }) => ({
  background: 'green',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  cursor: 'pointer',
  fontSize: '1.25rem',
  '&:hover': {
    background: 'darkgreen',
  },
}));

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      fetchProduct(id)
        .then((data) => setProduct(data))
        .catch((error) => console.error(error));
    }
  }, [id]);

  const { dispatch } = useCart();

  const addToCart = (productId, quantity) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { productId, quantity },
    });

    alert('Product added to cart');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <ProductPageContainer>
      <Link href='/products' style={{ marginBottom: '20px' }}>
        <>Go to products</>
      </Link>
      <CartButton />
      <Product>
        <ProductName>{product.title}</ProductName>
        <ProductImage
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
        />
        <ProductDescription>{product.description}</ProductDescription>
        <ProductPrice>${product.price}</ProductPrice>
        <ProductRating>Rating: {product.rating.rate} ({product.rating.count} reviews)</ProductRating>
        <AddToCartButton onClick={() => addToCart(product.id, 1)}>Add to Cart</AddToCartButton>
      </Product>
    </ProductPageContainer>
  );
};

export default ProductPage;