import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CartProvider } from '@/cart';
import { ProductCardList } from '@/product/product.list';
import { mockProducts } from '@/product/__mocks__/productsMock';

const queryClient = new QueryClient();

describe('ProductCardList Component', () => {
    test('renders an empty state when no products are available', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <CartProvider>
                    <ProductCardList products={[]} handleProductClick={() => { }} />
                </CartProvider>
            </QueryClientProvider>
        );

        expect(screen.getByText('No hay productos disponibles.')).toBeDefined();
    });

    test('renders products correctly', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <CartProvider>
                    <ProductCardList products={mockProducts} handleProductClick={() => { }} />
                </CartProvider>
            </QueryClientProvider>
        );

        expect(screen.getByRole('heading', { name: mockProducts[0].name })).toBeDefined();
        expect(screen.getByRole('heading', { name: mockProducts[1].name })).toBeDefined();
    });
});