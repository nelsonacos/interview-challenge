import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart } from '@/cart';
import { RecommendedCard } from '@/product';
import { mockProducts } from '@/product/__mocks__/productsMock';
import { CartContextProps } from '@/cart/cart.types';

vi.mock('@/cart', async (importOriginal) => {
    const actual = (await importOriginal()) || {};
    return {
        ...actual,
        useCart: vi.fn(),
    };
});

describe('RecommendedCard Component', () => {
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

    test('renders product name correctly', () => {
        render(
            <CartProvider>
                <RecommendedCard productId={mockProducts[0].product_id} products={mockProducts} />
            </CartProvider>
        );

        expect(screen.getByText(mockProducts[0].name)).toBeDefined();
    });

    test('calls addToCart when clicking the "Add to Cart" button', () => {
        render(
            <CartProvider>
                <RecommendedCard productId={mockProducts[0].product_id} products={mockProducts} />
            </CartProvider>
        );

        const button = screen.getByRole('button', { name: /Add to Cart/i });

        fireEvent.click(button);

        expect(mockAddToCart).toHaveBeenCalledTimes(1);
        expect(mockAddToCart).toHaveBeenCalledWith(mockProducts[0]);
    });

    test('displays "Product not found" when product does not exist', () => {
        render(
            <CartProvider>
                <RecommendedCard productId="non-existent-id" products={mockProducts} />
            </CartProvider>
        );

        expect(screen.getByText('Product not found')).toBeDefined();
    });
});