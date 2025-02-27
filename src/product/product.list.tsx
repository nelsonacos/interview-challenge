import { Product } from '@/types'
import { ProductCard } from './product.card'
import styles from './product.module.css'

interface ProductCardListProps {
    products: Product[];
    handleProductClick: (product: Product) => void;
}

export const ProductCardList = ({ products, handleProductClick }: ProductCardListProps) => {
    if (products.length === 0) return <p>No hay productos disponibles.</p>;

    return (
        <div className={styles.productsContainer}>
            {products.map((product: Product) => (
                <ProductCard key={product.product_id} product={product} handleProductClick={handleProductClick} />
            ))}
        </div>
    );
};