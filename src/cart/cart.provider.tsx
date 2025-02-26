"use client"
import { useState, useEffect, ReactNode } from 'react'
import { CartContext } from './cart.context'
import { CartItem } from './cart.types'
import { Product } from '@/types'

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const [cartItems, setCartItems] = useState<CartItem>({});

    useEffect(() => {
        if (isClient) {
            const storedCart = localStorage.getItem("cartItems");
            const initialCart = storedCart ? JSON.parse(storedCart) : {};
            setCartItems(initialCart);
        }
    }, [isClient]);

    useEffect(() => {
        if (isClient && Object.keys(cartItems).length > 0) {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
    }, [cartItems, isClient]);

    const addToCart = (product: Product) => {
        setCartItems((prevCart) => {
            const newCart = { ...prevCart };
            const productId = product.product_id;

            if (newCart[productId]) {
                newCart[productId].quantity += 1;
            } else {
                newCart[productId] = { product, quantity: 1 };
            }
            return newCart;
        });
    };

    const removeFromCart = (productId: string) => {
        setCartItems((prevCart: CartItem) => {
            const newCart = { ...prevCart };
            delete newCart[productId];
            return newCart;
        });
    };

    const clearCart = () => {
        setCartItems({});
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}