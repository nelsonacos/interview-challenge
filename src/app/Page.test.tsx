import { render, screen } from '@testing-library/react'
import { ReactQueryProvider } from '@/react-query-provider'
import { CartProvider } from '@/cart'
import Home from '@/app/page'

describe('Home Page', () => {
    test('renders the component and shows loading state when the list is empty', () => {
        render(
            <ReactQueryProvider>
                <CartProvider>
                    <Home />
                </CartProvider>
            </ReactQueryProvider>
        )
        expect(screen.getByText('Loading...')).toBeDefined()
    })
})