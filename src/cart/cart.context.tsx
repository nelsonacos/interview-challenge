"use client"
import { Product } from '@/types'
import { createContext, ReactNode, useEffect, useState } from 'react';

type CartItem = Record<string, {
    product: Product;
    quantity: number;
}>

interface CartContextProps {
    cartItems: CartItem;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextProps | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const storedCart = localStorage.getItem('cartItems');
    const initialCart = storedCart ? JSON.parse(storedCart) : {};
    const [cartItems, setCartItems] = useState<CartItem>(initialCart);

    useEffect(() => {
        if (Object.keys(cartItems).length > 0) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }, [cartItems])

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