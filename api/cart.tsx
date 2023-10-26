import { CartItem } from "@/components/CartContext";

export const saveCartToLocalStorage = (cartData: CartItem[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartData));
    }
  };
  
  export const loadCartFromLocalStorage = (): CartItem[] => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          return JSON.parse(savedCart) as CartItem[];
        } catch (error) {
          console.error('Error parsing cart data from localStorage:', error);
        }
      }
    }
    return [];
  };
  