"use client"
import { createContext } from 'react';
import type { CartContextProps } from './cart.types'

export const CartContext = createContext<CartContextProps | undefined>(undefined)