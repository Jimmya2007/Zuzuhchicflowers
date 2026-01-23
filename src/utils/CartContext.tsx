import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  price: string;
  priceNumeric: number;
  currency: 'HTG' | 'USD';
  image: string;
  category: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => { htg: number; usd: number };
  getCartCount: () => number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('zuzuh-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('zuzuh-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const parsePrice = (price: string): { numeric: number; currency: 'HTG' | 'USD' } => {
    // Remove spaces and convert to uppercase
    const cleanPrice = price.replace(/\s+/g, ' ').trim();
    
    // Check if it's USD
    if (cleanPrice.includes('$') || cleanPrice.toLowerCase().includes('us')) {
      const numericValue = parseFloat(cleanPrice.replace(/[^0-9.]/g, ''));
      return { numeric: numericValue, currency: 'USD' };
    }
    
    // Otherwise it's HTG (gourdes)
    const numericValue = parseFloat(cleanPrice.replace(/[^0-9.]/g, ''));
    return { numeric: numericValue, currency: 'HTG' };
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prevItems => {
      // Check if item already exists
      const existingItem = prevItems.find(i => i.id === item.id);
      
      if (existingItem) {
        // Increase quantity
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      
      // Add new item
      const { numeric, currency } = parsePrice(item.price);
      return [...prevItems, { ...item, quantity: 1, priceNumeric: numeric, currency }];
    });

    // Show success feedback
    console.log('✅ Item added to cart:', item.name);
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => {
        if (item.currency === 'USD') {
          total.usd += item.priceNumeric * item.quantity;
        } else {
          total.htg += item.priceNumeric * item.quantity;
        }
        return total;
      },
      { htg: 0, usd: 0 }
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
