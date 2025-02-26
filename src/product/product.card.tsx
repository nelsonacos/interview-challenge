"use client"
import { SyntheticEvent } from 'react'
import { normalizeTitle, normalizePrice } from './product.helpers'
import { useCart } from '@/cart'
import Image from 'next/image';
import { Product } from '@/types'

import styles from './product.module.css'

export const ProductCard = ({ products, handleProductClick }: { products: Product[], handleProductClick: (product: Product) => void }) => {
    const defaultImage = '/default-img.png';
    const { addToCart, removeFromCart, cartItems } = useCart();

    return (
        <>
            {products.map((product: Product) => {
                const isInCart = cartItems[product.product_id];

                return (
                    <article style={{ cursor: 'pointer' }} onClick={() => { handleProductClick(product) }} className={styles.productCard} key={product.product_id}>
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
                                onClick={(e) => {
                                    e.stopPropagation(); // Evita que el clic se propague al artículo
                                    addToCart(product);
                                }}
                                type="button"
                                aria-label={`Add ${product.name} to cart`}
                            >
                                {isInCart ? 'Added' : 'Add to Cart'}
                            </button>

                            {isInCart && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFromCart(product.product_id);
                                    }}
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