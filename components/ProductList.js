import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../components/CartContext';

const ProductListContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

const Product = styled(Box)(({ theme }) => ({
  margin: '5px',
  width: '20%',
  height: '400px',
  padding: theme.spacing(2),
  border: '1px solid #e0e0e0',
  borderRadius: theme.spacing(1),
}));

const ProductName = styled('div')(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 'bold',
}));

const ProductImage = styled(Image)({
  width: 200,
  height: 200,
});

const ProductPrice = styled('div')(({ theme }) => ({
  color: 'green',
}));

const loaderProp = ({ src }) => {
  return src;
};

const AddToCartButton = styled('button')(({ theme }) => ({
    background: 'green',
    color: 'white',
    border: 'none',
    marginTop: '2%',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '1.25rem',
    '&:hover': {
      background: 'darkgreen',
    },
  }));

const ProductList = ({ products }) => {
  const { dispatch } = useCart();

  const addToCart = (productId, quantity) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { productId, quantity },
    });

    alert('Product added to cart');
  };
  
    return (
      <ProductListContainer>
        {products.map((product) => (
          <Product key={product.id}>
            <Link href={`/product/${product.id}`}>
              <ProductImage
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                loader={loaderProp}
              />
              <ProductName>{product.title}</ProductName>
              <ProductPrice>${product.price}</ProductPrice>
            </Link>
            <AddToCartButton onClick={() => addToCart(product.id, 1)}>Add to Cart</AddToCartButton>
          </Product>
        ))}
      </ProductListContainer>
    );
  };

export default ProductList;