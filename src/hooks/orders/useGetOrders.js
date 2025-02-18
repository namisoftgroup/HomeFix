import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import { useSearchParams } from "react-router-dom";

export default function useGetOrders() {
  const [search] = useSearchParams();
  const type = search.get("type") || "current";

  const { isLoading, data, error } = useQuery({
    queryKey: ["orders", type],

    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/homefix/orders-client`, {
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
    
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}
