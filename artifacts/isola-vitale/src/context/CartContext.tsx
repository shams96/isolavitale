import { createContext, useContext, useState, useEffect } from 'react';

const SUBSCRIPTION_DISCOUNT = 0.20;

interface CartItem {
  id: string;
  cartId: string | number;
  name: string;
  price: number;
  fullPrice?: number;
  imageSrc?: string;
  image?: string;
  variant?: string;
  quantity: number;
  isSubscription?: boolean;
  [key: string]: any;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (itemId: string | number) => void;
  updateQuantity: (itemId: string | number, newQuantity: number) => void;
  toggleSubscription: (itemId: string | number) => void;
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  subtotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('isola_cart_v2');
    if (savedCart) {
      try { setCart(JSON.parse(savedCart)); } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('isola_cart_v2', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(
        item => item.id === product.id && item.variant === product.variant && item.isSubscription === product.isSubscription
      );
      if (existing) {
        return prev.map(item =>
          (item.id === product.id && item.variant === product.variant && item.isSubscription === product.isSubscription)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      const fullPrice = product.fullPrice || product.price;
      const price = product.isSubscription
        ? Math.round(fullPrice * (1 - SUBSCRIPTION_DISCOUNT))
        : fullPrice;
      return [...prev, { ...product, quantity: product.quantity || 1, price, fullPrice }];
    });
    setIsDrawerOpen(true);
  };

  const removeFromCart = (itemId: string | number) => {
    setCart(prev => prev.filter(item => item.cartId !== itemId));
  };

  const updateQuantity = (itemId: string | number, newQuantity: number) => {
    if (newQuantity < 1) {
      setCart(prev => prev.filter(item => item.cartId !== itemId));
      return;
    }
    setCart(prev => prev.map(item => item.cartId === itemId ? { ...item, quantity: newQuantity } : item));
  };

  const toggleSubscription = (itemId: string | number) => {
    setCart(prev => prev.map(item => {
      if (item.cartId !== itemId) return item;
      const fullPrice = item.fullPrice || item.price;
      const isSubscription = !item.isSubscription;
      const price = isSubscription
        ? Math.round(fullPrice * (1 - SUBSCRIPTION_DISCOUNT))
        : fullPrice;
      return { ...item, isSubscription, price, fullPrice };
    }));
  };

  const toggleDrawer = () => setIsDrawerOpen(prev => !prev);

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity,
      toggleSubscription, isDrawerOpen, toggleDrawer, subtotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
