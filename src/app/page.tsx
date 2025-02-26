"use client"
import { fetchData } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { Product } from '@/types'
import { ProductCard, RecommendedPopup } from '@/product'
import styles from "./page.module.css";
import { useState } from 'react'

export default function Home() {
  const { isLoading, error, data } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => fetchData('http://localhost:3001/products'),
  })

  const products = data ?? [];

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <div className={styles.productsContainer}>
        <ProductCard products={products} handleProductClick={handleProductClick} />
      </div>
      <RecommendedPopup selectedProduct={selectedProduct} products={products} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}