"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Load cart from local storage on mount (optional transparency)
    useEffect(() => {
        const savedCart = localStorage.getItem('biosphere_cart');
        if (savedCart) setCart(JSON.parse(savedCart));
    }, []);

    // Save cart to local storage
    useEffect(() => {
        localStorage.setItem('biosphere_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
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

    const removeFromCart = (itemId) => {
        setCart(prev => prev.filter(item => item.cartId !== itemId));
    };

    const updateQuantity = (itemId, newQuantity) => {
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

export const useCart = () => useContext(CartContext);
