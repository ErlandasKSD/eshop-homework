import { CartProvider } from '../components/CartContext'; // Import the CartProvider

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider> {/* Wrap your app with CartProvider */}
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;