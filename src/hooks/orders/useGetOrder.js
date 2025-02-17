import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetOrder() {
  const { id } = useParams();

  const { isLoading, data, error } = useQuery({
    queryKey: ["order-details", id],

    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/homefix/orders-client/${id}`);
        if (res.status === 200) {
          return res.data.data || {};
        }
      } catch (error) {
        console.error("Error fetching order:", error.message);
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
