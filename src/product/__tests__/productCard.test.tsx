import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart } from '@/cart';
import { ProductCard } from '@/product/product.card';
import { mockProducts } from '@/product/__mocks__/productsMock';
import { vi } from 'vitest';
import { CartContextProps } from '@/cart/cart.types';

vi.mock('@/cart', async (importOriginal) => {
    const actual = (await importOriginal()) || {};
    return {
        ...actual,
        useCart: vi.fn(),
    };
});

describe('ProductCard Component', () => {
    const mockAddToCart = vi.fn();
    const mockRemoveFromCart = vi.fn();
    const mockGetQuantityByProductId = vi.fn()
    const mockClearCart = vi.fn();

    beforeEach(() => {
        vi.mocked(useCart).mockReturnValue({
            cartItems: {},
            addToCart: mockAddToCart,
            removeFromCart: mockRemoveFromCart,
            getQuantityByProductId: mockGetQuantityByProductId,
            clearCart: mockClearCart,
        } as CartContextProps);
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    test('calls addToCart when clicking the "Add to Cart" button', () => {
        render(
            <CartProvider>
                <ProductCard product={mockProducts[0]} handleProductClick={() => { }} />
            </CartProvider>
        );

        const button = screen.getByRole('button', { name: `Add ${mockProducts[0].name} to cart` });

        fireEvent.click(button);

        expect(mockAddToCart).toHaveBeenCalledTimes(1);
        expect(mockAddToCart).toHaveBeenCalledWith(mockProducts[0]);
    });

    test('calls removeFromCart when clicking the "Remove" button', () => {
        vi.mocked(useCart).mockReturnValue({
            cartItems: {
                [mockProducts[0].product_id]: {
                    product: mockProducts[0],
                    quantity: 1
                }
            },
            addToCart: mockAddToCart,
            removeFromCart: mockRemoveFromCart,
            getQuantityByProductId: mockGetQuantityByProductId,
            clearCart: mockClearCart,
        } as CartContextProps);

        render(
            <CartProvider>
                <ProductCard product={mockProducts[0]} handleProductClick={() => { }} />
            </CartProvider>
        );

        const removeButton = screen.getByRole('button', {
            name: `Remove ${mockProducts[0].name} from cart`
        });

        fireEvent.click(removeButton);

        expect(mockRemoveFromCart).toHaveBeenCalledTimes(1);
        expect(mockRemoveFromCart).toHaveBeenCalledWith(mockProducts[0].product_id);
    });

    test('calls handleProductClick when clicking on the product card', () => {
        const mockHandleProductClick = vi.fn();

        render(
            <CartProvider>
                <ProductCard
                    product={mockProducts[0]}
                    handleProductClick={mockHandleProductClick}
                />
            </CartProvider>
        );

        const productCard = screen.getByRole('article');

        fireEvent.click(productCard);

        expect(mockHandleProductClick).toHaveBeenCalledTimes(1);
        expect(mockHandleProductClick).toHaveBeenCalledWith(mockProducts[0]);
    });

    test('does not call handleProductClick when clicking "Add to Cart" button', () => {
        const mockHandleProductClick = vi.fn();

        render(
            <CartProvider>
                <ProductCard
                    product={mockProducts[0]}
                    handleProductClick={mockHandleProductClick}
                />
            </CartProvider>
        );

        const addButton = screen.getByRole('button', { name: `Add ${mockProducts[0].name} to cart` });

        fireEvent.click(addButton);

        expect(mockHandleProductClick).not.toHaveBeenCalled();
    });
});