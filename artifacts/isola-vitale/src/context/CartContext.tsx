import { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: string;
  cartId: string | number;
  name: string;
  price: number;
  imageSrc?: string;
  image?: string;
  variant?: string;
  quantity: number;
  [key: string]: any;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (itemId: string | number) => void;
  updateQuantity: (itemId: string | number, newQuantity: number) => void;
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  subtotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('biosphere_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('biosphere_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.variant === product.variant);
      if (existing) {
        return prev.map(item =>
          (item.id === product.id && item.variant === product.variant)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsDrawerOpen(true);
  };

  const removeFromCart = (itemId: string | number) => {
    setCart(prev => prev.filter(item => item.cartId !== itemId));
  };

  const updateQuantity = (itemId: string | number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart(prev => prev.map(item => item.cartId === itemId ? { ...item, quantity: newQuantity } : item));
  };

  const toggleDrawer = () => setIsDrawerOpen(prev => !prev);

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, isDrawerOpen, toggleDrawer, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
