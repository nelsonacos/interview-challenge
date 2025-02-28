"use client";
import { SyntheticEvent, useMemo } from "react";
import { normalizeTitle, normalizePrice } from "./product.helpers";
import { useCart } from "@/cart";
import Image from "next/image";
import { Product } from "@/types";
import styles from "./product.module.css";

interface ProductCardProps {
    product: Product;
    handleProductClick: (product: Product) => void;
}

export const ProductCard = ({ product, handleProductClick }: ProductCardProps) => {
    const defaultImage = "/default-img.png";
    const { addToCart, removeFromCart, cartItems, getQuantityByProductId } = useCart();

    const isInCart = useMemo(() => cartItems[product.product_id], [cartItems, product.product_id]);

    return (
        <article
            style={{ cursor: "pointer" }}
            onClick={() => handleProductClick(product)}
            className={styles.productCard}
        >
            <figure className={styles.productCardImageContainer}>
                <Image
                    src={product.image_url || defaultImage}
                    onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = defaultImage;
                    }}
                    alt={product.name}
                    fill
                    objectFit="cover"
                    unoptimized
                />
            </figure>
            <div>
                <h3 className={styles.productName}>{normalizeTitle(product.name)}</h3>
                <span className={styles.productPrice}>{normalizePrice(product.price_per_unit)}</span>
            </div>
            <div className={styles.productCardActions}>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                    }}
                    type="button"
                    aria-label={`Add ${product.name} to cart`}
                >
                    {isInCart ? "+" : "Add to Cart"}
                </button>

                {isInCart && (
                    <span className={styles.inCartDisplay}>
                        {getQuantityByProductId(product.product_id)}
                    </span>
                )}

                {isInCart && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            removeFromCart(product.product_id);
                        }}
                        type="button"
                        aria-label={`Remove ${product.name} from cart`}
                    >
                        -
                    </button>
                )}
            </div>
        </article>
    );
};