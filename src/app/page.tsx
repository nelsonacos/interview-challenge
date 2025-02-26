"use client"
import { fetchData } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { Category, Product } from '@/types'
import { ProductCard, RecommendedPopup, FiltersPanel } from '@/product'
import styles from "./page.module.css";
import { useMemo, useState } from 'react'

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

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((product) =>
      (product.categories ?? []).includes(selectedCategory as Category)
    );
  }, [selectedCategory, products]);

  const handleFilterChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <FiltersPanel selectedCategory={selectedCategory} onFilterChange={handleFilterChange} />
      <div className={styles.productsContainer}>
        <ProductCard products={filteredProducts} handleProductClick={handleProductClick} />
      </div>
      <RecommendedPopup selectedProduct={selectedProduct} products={products} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}