import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetProviderOrders() {
  const [search] = useSearchParams();
  const type = search.get("type") || "new";

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["provider-orders", type],

    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/homefix/orders-provider`, {
          params: {
            type,
          },
        });
        if (res.status === 200) {
          return res.data.data || {};
        }
      } catch (error) {
        console.error("Error fetching orders:", error.message);
        throw error;
      }
    },
  });
  return { isLoading, data, error, refetch };
}
