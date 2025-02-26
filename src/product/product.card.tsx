"use client"
import { SyntheticEvent } from 'react'
import { normalizeTitle, normalizePrice } from './product.helpers'
import { useCart } from '@/cart'
import Image from 'next/image';
import { Product } from '@/types'

import styles from './product.module.css'

export const ProductCard = ({ products }: { products: Product[] }) => {
    const defaultImage = '/default-img.png';
    const { addToCart, removeFromCart, cartItems } = useCart();

    return (
        <>
            {products.map((product: Product) => {
                // Verifica si el producto está en el carrito
                const isInCart = cartItems[product.product_id];

                return (
                    <article className={styles.productCard} key={product.product_id}>
                        <figure>
                            <Image
                                src={product.image_url || defaultImage}
                                onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = defaultImage
                                }}
                                alt={product.name}
                                width={200}
                                height={200}
                                unoptimized
                            />
                        </figure>
                        <div>
                            <h3>{normalizeTitle(product.name)}</h3>
                            <span>{normalizePrice(product.price_per_unit)}</span>
                        </div>
                        <div className={styles.productCardActions}>
                            <button
                                onClick={() => addToCart(product)}
                                type="button"
                                aria-label={`Add ${product.name} to cart`}
                            >
                                {isInCart ? 'added' : 'Add to Cart'}
                            </button>
                            {isInCart && (
                                <button
                                    onClick={() => removeFromCart(product.product_id)}
                                    type="button"
                                    aria-label={`Remove ${product.name} from cart`}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    </article>
                );
            })}
        </>
    );
};