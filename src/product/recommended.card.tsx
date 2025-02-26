import { useCart } from '@/cart'
import { Product } from '@/types'

export const RecommendedCard = ({
    productId,
    products,
}: {
    productId: string
    products: Product[]
}) => {
    const product = products.find((product: Product) => product.product_id === productId)

    const { addToCart } = useCart()

    if (!product) return <p>Product not found</p>

    return (
        <div>
            <h3 style={{ color: 'black' }}>{product.name}</h3>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
    )
}