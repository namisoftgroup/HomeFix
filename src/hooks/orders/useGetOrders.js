import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetOrders() {
  const [search] = useSearchParams();
  const type = search.get("type") || "current";
  const { client } = useSelector((state) => state.clientData);

  const { isLoading, data, error } = useQuery({
    queryKey: ["orders", type],

    queryFn: async () => {
      try {
        const res = await axiosInstance.get(
          `/homefix/${
            client?.type === "provider" ? "orders-provider" : "orders-client"
          }`,
          {
            params: {
              type,
            },
          }
        );
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
