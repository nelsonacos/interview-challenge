import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { CartProvider } from '@/cart';
import Home from '@/app/page';

const queryClient = new QueryClient();

const mockProducts = [
    {
        product_id: '1',
        variant_id: 'v1',
        total_price: '10.00',
        price_per_unit: '5.00',
        list_price_id: '1',
        sku: 'sku1',
        categories: ['aguas'],
        units_per_pack: 1,
        image_url: '/product1.jpg',
        handle: 'product1',
        compare_at_price: '12.00',
        allowed_packs: [1],
        name: 'Product 1',
        description: 'Description of product 1',
        discount_percentage: 10,
        size: 500,
        price_per_litre: '20.00',
    },
    {
        product_id: '2',
        variant_id: 'v2',
        total_price: '15.00',
        price_per_unit: '7.50',
        list_price_id: '2',
        sku: 'sku2',
        categories: ['cervezas'],
        units_per_pack: 1,
        image_url: '/product2.jpg',
        handle: 'product2',
        compare_at_price: '18.00',
        allowed_packs: [1],
        name: 'Product 2',
        description: 'Description of product 2',
        discount_percentage: 5,
        size: 750,
        price_per_litre: '20.00',
    },
];

describe('Home Page', () => {
    vi.mock('@tanstack/react-query', async () => {
        const originalModule = await vi.importActual('@tanstack/react-query');

        return {
            ...originalModule,
            useQuery: vi.fn(),
        };
    });

    test('renders the component with an empty list', () => {
        (useQuery as vi.Mock).mockReturnValue({
            isLoading: true,
            error: null,
            data: [],
        });

        render(
            <QueryClientProvider client={queryClient}>
                <CartProvider>
                    <Home />
                </CartProvider>
            </QueryClientProvider>
        );

        expect(screen.getByText('Loading...')).toBeDefined();
    });

    test('shows error text when there is an error', () => {
        (useQuery as vi.Mock).mockReturnValue({
            isLoading: false,
            error: new Error('Something went wrong'),
            data: null,
        });

        render(
            <QueryClientProvider client={queryClient}>
                <CartProvider>
                    <Home />
                </CartProvider>
            </QueryClientProvider>
        );

        expect(screen.getByText(/Error: Something went wrong/)).toBeDefined();
    });

    test('renders products correctly', () => {
        (useQuery as vi.Mock).mockReturnValue({
            isLoading: false,
            error: null,
            data: mockProducts, // Usamos los mockProducts aquí
        });

        render(
            <QueryClientProvider client={queryClient}>
                <CartProvider>
                    <Home />
                </CartProvider>
            </QueryClientProvider>
        );

        expect(screen.getByRole('heading', { name: 'Product 1' })).toBeDefined();
        expect(screen.getByRole('heading', { name: 'Product 2' })).toBeDefined();
    });
});