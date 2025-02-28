"use client";
import { useState, useEffect, ReactNode } from 'react';
import { CartContext } from './cart.context';
import { CartItem } from './cart.types';
import { Product } from '@/types';

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem>(() => {
        if (typeof window !== "undefined") {
            const storedCart = localStorage.getItem("cartItems");
            return storedCart ? JSON.parse(storedCart) : {};
        }
        return {};
    });

    useEffect(() => {
        if (Object.keys(cartItems).length > 0) {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
    }, [cartItems]);

    const addToCart = (product: Product) => {
        setCartItems((prevCart) => {
            const productId = product.product_id;
            return {
                ...prevCart,
                [productId]: {
                    product,
                    quantity: (prevCart[productId]?.quantity || 0) + 1,
                },
            };
        });
    };

    const removeFromCart = (productId: string) => {
        setCartItems((prevCart: CartItem) => {
            const newCart = { ...prevCart };
            if (newCart[productId]) {
                if (newCart[productId].quantity > 1) {
                    newCart[productId].quantity -= 1;
                } else {
                    delete newCart[productId];
                }
            }
            return newCart;
        });
    };

    const getQuantityByProductId = (productId: string): number => {
        return cartItems[productId]?.quantity || 0;
    };

    const clearCart = () => {
        setCartItems({});
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getQuantityByProductId, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};