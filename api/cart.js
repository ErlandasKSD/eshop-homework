export const saveCartToLocalStorage = (cartData) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartData));
    }
  };
  
  export const loadCartFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          return JSON.parse(savedCart);
        } catch (error) {
          console.error('Error parsing cart data from localStorage:', error);
        }
      }
    }
    return [];
  };