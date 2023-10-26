import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

const CART_STORAGE_KEY = 'cart';

export interface CartItem {
  productId: number;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: number } }
  | { type: 'CLEAR_CART' };

const initialCartState: CartState = {
  cart: [],
};

const CartContext = createContext<{ state: CartState; dispatch: React.Dispatch<CartAction> } | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
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

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const savedCart = (typeof window !== 'undefined' && localStorage.getItem(CART_STORAGE_KEY)) ? JSON.parse(localStorage.getItem(CART_STORAGE_KEY)!) : null;
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
