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

    // Auto-manage Ritual Gifts
    useEffect(() => {
        const has90Day = cart.some(item => item.purchaseType === '90-day' && !item.isAutoGift);
        const hasMasterclass = cart.some(item => item.id === 'masterclass-gift');

        if (has90Day && !hasMasterclass) {
            setCart(prev => [...prev, 
                {
                    id: 'masterclass-gift',
                    cartId: 'masterclass-gift',
                    name: '90-Day Skin Longevity Masterclass',
                    price: 0,
                    variant: 'Digital Access ($99 Value) - Unlocked 🔓',
                    imageSrc: '/serum-uniform.png', // Placeholder
                    quantity: 1,
                    isAutoGift: true
                },
                {
                    id: 'ritual-card-gift',
                    cartId: 'ritual-card-gift',
                    name: 'Sensory Ritual Card',
                    price: 0,
                    variant: 'Physical Inclusion - Unlocked 🔓',
                    imageSrc: '/marble.png', // Placeholder
                    quantity: 1,
                    isAutoGift: true
                }
            ]);
        } else if (!has90Day && hasMasterclass) {
            setCart(prev => prev.filter(item => !item.isAutoGift));
        }
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
        setCart(prev => prev.filter(item => item.cartId !== itemId && item.id !== itemId));
    };

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        setCart(prev => prev.map(item => {
            if (item.isAutoGift) return item; // Cannot update quantity of auto-gifts
            return item.cartId === itemId || item.id === itemId ? { ...item, quantity: newQuantity } : item;
        }));
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
