"use client"
import { fetchData } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { Product } from '@/types'
import { ProductCard } from '@/product'
import styles from "./page.module.css";

export default function Home() {
  const { isLoading, error, data } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => fetchData('http://localhost:3001/products'),
  })

  const products = data ?? [];

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <div className={styles.productsContainer}>
        <ProductCard products={products} />
      </div>
    </div>
  );
}