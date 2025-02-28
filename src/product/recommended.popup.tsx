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
            <div className={styles.overlay}>

                <div className={styles.popupContainer}>
                    <button aria-label='X' className={styles.closeButton} onClick={onClose}>✕</button>
                    <h4 className={styles.popupTitle}>Recommended For You</h4>
                    {isLoading ? (
                        <p>Loading recommendations...</p>
                    ) : (
                        <div>
                            {recommendations.map((id: string) => (
                                <RecommendedCard products={products} key={id} productId={id} />
                            ))}
                        </div>
                    )}
                </div>
            </div >
        </>
    );
};