import { SyntheticEvent, useMemo } from "react";
import Image from 'next/image'
import { useCart } from '@/cart'
import { Product } from '@/types'
import { normalizeTitle, formatPrice } from '@/product/product.helpers'
import styles from './product.module.css'

export const RecommendedCard = ({
    productId,
    products,
}: {
    productId: string
    products: Product[]
}) => {
    const defaultImage = "/default-img.png";
    const product = products.find((product: Product) => product.product_id === productId)
    const { addToCart } = useCart()
    const formattedPrice = useMemo(() => {
        if (!product) return "";
        return formatPrice(product.price_per_unit);
    }, [product]);

    if (!product) return <p>Product not found</p>
    return (
        <article className={styles.productMiniCard}>
            <figure className={styles.productMiniCardColumnLeft}>
                <Image
                    src={product.image_url || defaultImage}
                    onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = defaultImage;
                    }}
                    alt={product.product_id}
                    fill
                    objectFit="cover"
                    unoptimized
                />
            </figure>
            <div className={styles.productMiniCardColumnRight}>
                <h3 className={styles.productNameInMiniCard}>{normalizeTitle(product.name)}</h3>
                <div style={{ display: 'flex', gap: '5px' }}>
                    <button style={{}} onClick={() => addToCart(product)}>Add to Cart</button>
                    <span className={styles.productPriceInMiniCard}>{formattedPrice}</span>
                </div>
            </div>
        </article>
    )
}