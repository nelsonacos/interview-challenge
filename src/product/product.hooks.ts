import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/services";

const fetchRecommendations = async (productId: string) => {
  const data = await fetchData(`http://localhost:3001/recommendations?product_id=${productId}`);
  return data[0]?.recommendations || [];
};

export const useRecommendations = (productId?: string) => {
  return useQuery({
    queryKey: ["recommendations", productId],
    queryFn: () => (productId ? fetchRecommendations(productId) : []),
    enabled: !!productId,
  });
};