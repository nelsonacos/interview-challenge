"use client"
import { SyntheticEvent } from 'react'
import { normalizeTitle, normalizePrice } from './product.helpers'
import Image from 'next/image';
import { Product } from '@/types'

import styles from './product.module.css'

export const ProductCard = ({ products }: { products: Product[] }) => {
    const defaultImage = '/default-img.png';
    return (
        <>
            {products.map((product: Product) => (
                <article className={styles.productCard} key={product.product_id}>
                    <figure>
                        <Image
                            src={product.image_url || defaultImage}
                            onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = defaultImage
                            }
                            }
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
                        <button type="button" aria-label={`Agregar ${product.name} al carrito`}>
                            Add to Cart
                        </button>
                        <button type="button" aria-label={`Delete ${product.name} to Cart`}>
                            Remove
                        </button>
                    </div>
                </article>
            ))}
        </>
    )
}