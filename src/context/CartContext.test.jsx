import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CartProvider, useCart } from './CartContext';
import { useEffect } from 'react';

// Mock localStorage
const localStorageMock = (function () {
    let store = {};
    return {
        getItem(key) {
            return store[key] || null;
        },
        setItem(key, value) {
            store[key] = value.toString();
        },
        clear() {
            store = {};
        }
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// A simple test component to interact with the cart context
function TestComponent({ action, product }) {
    const { cart, addToCart, removeFromCart } = useCart();

    useEffect(() => {
        if (action === 'add' && product) {
            addToCart(product);
        } else if (action === 'remove' && product) {
            removeFromCart(product.cartId);
        }
    }, [action, product]);

    return (
        <div>
            <div data-testid="cart-count">{cart.length}</div>
            <div data-testid="cart-items">
                {cart.map(item => (
                    <div key={item.cartId} data-testid={`item-${item.id}`}>{item.name}</div>
                ))}
            </div>
        </div>
    );
}

describe('CartContext', () => {
    it('automatically adds gifts when a 90-day protocol is added', () => {
        const product = {
            id: 'test-product',
            cartId: 'test-cart-id',
            name: 'Test Cream',
            price: 100,
            variant: 'Signature Vessel - 90-Day Protocol',
            purchaseType: '90-day',
        };

        const { rerender } = render(
            <CartProvider>
                <TestComponent action="add" product={product} />
            </CartProvider>
        );

        // Expect 3 items (1 product + 2 gifts)
        expect(screen.getByTestId('cart-count').textContent).toBe('3');
        expect(screen.getByTestId('item-test-product')).toBeDefined();
        expect(screen.getByTestId('item-masterclass-gift')).toBeDefined();
        expect(screen.getByTestId('item-ritual-card-gift')).toBeDefined();

        // Now remove the product
        rerender(
            <CartProvider>
                <TestComponent action="remove" product={product} />
            </CartProvider>
        );

        // Expect 0 items (gifts should be removed)
        expect(screen.getByTestId('cart-count').textContent).toBe('0');
    });

    it('does not add gifts when a standard 30-day product is added', () => {
        localStorage.clear();
        
        const product = {
            id: 'test-product-30',
            cartId: 'test-cart-id-30',
            name: 'Test Cream 30',
            price: 50,
            variant: 'Signature Vessel - 30-Day Routine',
            purchaseType: '30-day',
        };

        render(
            <CartProvider>
                <TestComponent action="add" product={product} />
            </CartProvider>
        );

        // Expect 1 item (no gifts)
        expect(screen.getByTestId('cart-count').textContent).toBe('1');
        expect(screen.queryByTestId('item-masterclass-gift')).toBeNull();
    });
});
