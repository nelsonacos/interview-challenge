"use client";
import { useState, useEffect, ReactNode } from 'react';
import { CartContext } from './cart.context';
import { CartItem } from './cart.types';
import { Product } from '@/types';

export const CartProvider = ({ children }: { children: ReactNode }) => {
    // Inicializamos el estado de cartItems con los datos de localStorage, si existen
    const [cartItems, setCartItems] = useState<CartItem>(() => {
        if (typeof window !== "undefined") {
            const storedCart = localStorage.getItem("cartItems");
            return storedCart ? JSON.parse(storedCart) : {};
        }
        return {}; // Estado inicial vacío si no hay acceso a window
    });

    // Guardamos cartItems en localStorage cuando cambia
    useEffect(() => {
        if (Object.keys(cartItems).length > 0) {
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
    }, [cartItems]);

    // Función para agregar productos al carrito
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

    // Función para eliminar un producto del carrito
    const removeFromCart = (productId: string) => {
        setCartItems((prevCart: CartItem) => {
            const newCart = { ...prevCart };
            if (newCart[productId]) {
                if (newCart[productId].quantity > 1) {
                    newCart[productId].quantity -= 1;
                } else {
                    delete newCart[productId]; // Eliminar el producto solo cuando la cantidad es 1
                }
            }
            return newCart;
        });
    };

    // Función para obtener la cantidad de un producto específico
    const getQuantityByProductId = (productId: string): number => {
        return cartItems[productId]?.quantity || 0;
    };

    // Función para limpiar el carrito
    const clearCart = () => {
        setCartItems({});
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getQuantityByProductId, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};