import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from '@/cart';
import { RecommendedPopup } from '@/product';
import { mockProducts } from '@/product/__mocks__/productsMock';

const queryClient = new QueryClient();

describe('RecommendedPopup', () => {
    const mockOnClose = vi.fn();
    const mockProductId = '4854054682669';

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders recommended products', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <CartProvider>
                    <RecommendedPopup
                        selectedProduct={mockProducts.find(p => p.product_id === mockProductId) || null}
                        products={mockProducts}
                        onClose={mockOnClose}
                    />
                </CartProvider>
            </QueryClientProvider>
        );

        await waitFor(() => {
            const recommendedItems = screen.getAllByRole('article');
            expect(recommendedItems.length).toBe(3);
        });
    });

    it('calls onClose when clicking the "X" button', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <CartProvider>
                    <RecommendedPopup
                        selectedProduct={mockProducts.find(p => p.product_id === mockProductId) || null}
                        products={mockProducts}
                        onClose={mockOnClose}
                    />
                </CartProvider>
            </QueryClientProvider>
        );

        const button = screen.getByRole('button', { name: 'X' });

        fireEvent.click(button);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
});