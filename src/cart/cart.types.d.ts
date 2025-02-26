export type CartItem = Record<string, {
    product: Product;
    quantity: number;
}>

export interface CartContextProps {
    cartItems: CartItem;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
}