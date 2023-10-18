import { createContext, useContext, useReducer, useEffect } from 'react';

const CART_STORAGE_KEY = 'cart';

const initialCartState = {
  cart: [],
};

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingProductIndex = state.cart.findIndex((item) => item.productId === action.payload.productId);

      if (existingProductIndex !== -1) {
        state.cart[existingProductIndex].quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
      }

      return { ...state };
    case 'REMOVE_FROM_CART':
      state.cart = state.cart.filter((item) => item.productId !== action.payload.productId);

      if (typeof window !== 'undefined') {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
      }

      return { ...state };
    case 'CLEAR_CART':
      state.cart = [];

      if (typeof window !== 'undefined') {
        localStorage.removeItem(CART_STORAGE_KEY);
      }

      return { ...state };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const savedCart = (typeof window !== 'undefined') ? JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) : null;
  const initialState = savedCart ? { cart: savedCart } : initialCartState;

  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart));
    }
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};