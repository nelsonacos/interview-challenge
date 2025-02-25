import { fetchData } from '@/services'
import { ProductCard } from '@/product'
import styles from "./page.module.css";

export default async function Home() {
  const data = await fetchData('http://localhost:3001/products');
  return (
    <div>
      <div className={styles.productsContainer}>
        <ProductCard products={data} />
      </div>
    </div>
  );
}