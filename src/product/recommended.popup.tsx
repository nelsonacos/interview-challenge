import { useRecommendations } from './product.hooks'
import { Product } from '@/types'
import { RecommendedCard } from './recommended.card'
import styles from './product.module.css'

export const RecommendedPopup = ({ selectedProduct, products, onClose }: {
    selectedProduct: Product | null,
    products: Product[],
    onClose: () => void
}) => {
    const { data: recommendations, isLoading } = useRecommendations(selectedProduct?.product_id);

    if (!selectedProduct) return null;

    return (
        <>
            <div className={styles.overlay} onClick={onClose}>

                <div className={styles.popupContainer}>
                    <button className={styles.closeButton} onClick={onClose}>✕</button>
                    <h2>Recommended Products for {selectedProduct.name}</h2>
                    {isLoading ? (
                        <p>Loading recommendations...</p>
                    ) : recommendations && recommendations.length > 0 ? (
                        <ul>
                            {recommendations.map((id: string) => (
                                <RecommendedCard products={products} key={id} productId={id} />
                            ))}
                        </ul>
                    ) : (
                        <p>No recommendations available.</p>
                    )}
                </div>
            </div >
        </>
    );
};