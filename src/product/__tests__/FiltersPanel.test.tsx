import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FiltersPanel } from '@/product';
import { useCategories } from '@/product';

const createTestClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                gcTime: 0,
            },
        },
    });

vi.mock('@/product', async () => {
    const actual = await vi.importActual<typeof import('@/product')>('@/product');
    return {
        ...actual,
        useCategories: vi.fn(),
    };
});

describe('FiltersPanel', () => {
    it('renders select options correctly', async () => {
        (useCategories as vi.Mock).mockReturnValue({
            data: [
                { id: 1, name: 'aguas' },
                { id: 2, name: 'vinos' },
                { id: 3, name: 'cervezas' },
                { id: 4, name: 'gaseosas' },
                { id: 5, name: 'mas vendidos' },
            ],
            isLoading: false,
            error: null,
        });

        render(
            <QueryClientProvider client={createTestClient()}>
                <FiltersPanel selectedCategory={null} onFilterChange={vi.fn()} />
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('aguas')).toBeDefined();
            expect(screen.getByText('vinos')).toBeDefined();
            expect(screen.getByText('cervezas')).toBeDefined();
            expect(screen.getByText('gaseosas')).toBeDefined();
            expect(screen.getByText('mas vendidos')).toBeDefined();
        });
    });

    it('renders loading state', async () => {
        (useCategories as vi.Mock).mockReturnValue({
            data: null,
            isLoading: true,
            error: null,
        });

        render(
            <QueryClientProvider client={createTestClient()}>
                <FiltersPanel selectedCategory={null} onFilterChange={vi.fn()} />
            </QueryClientProvider>
        );

        await waitFor(() => {
            expect(screen.getByText('Cargando categorías...')).toBeDefined();
        });
    });

    it('handles category change', async () => {
        const onFilterChange = vi.fn();
        (useCategories as vi.Mock).mockReturnValue({
            data: [
                { id: 1, name: 'aguas' },
                { id: 2, name: 'vinos' },
                { id: 3, name: 'cervezas' },
                { id: 4, name: 'gaseosas' },
                { id: 5, name: 'mas vendidos' },
            ],
            isLoading: false,
            error: null,
        });

        render(
            <QueryClientProvider client={createTestClient()}>
                <FiltersPanel selectedCategory={null} onFilterChange={onFilterChange} />
            </QueryClientProvider>
        );

        const select = await waitFor(() => screen.getByRole('combobox'));
        fireEvent.change(select, { target: { value: 'cervezas' } });

        expect(onFilterChange).toHaveBeenCalledWith('cervezas');
    });
});