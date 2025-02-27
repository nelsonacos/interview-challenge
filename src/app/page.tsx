"use client"
import { fetchData } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { Product } from '@/types'
import { ProductCardList, RecommendedPopup, FiltersPanel } from '@/product'
import { useMemo, useState } from 'react'

export default function Home() {
  const { isLoading, error, data } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => fetchData('http://localhost:3001/products'),
  })

  const products = data ?? [];

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;

    return products.filter((product) =>
      (product.categories ?? []).some((category) => category === selectedCategory)
    );
  }, [selectedCategory, products]);

  const handleFilterChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <FiltersPanel selectedCategory={selectedCategory} onFilterChange={handleFilterChange} />
      <ProductCardList products={filteredProducts} handleProductClick={handleProductClick} />
      <RecommendedPopup selectedProduct={selectedProduct} products={products} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}