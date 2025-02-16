import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetOffers(enabled) {
  const { isLoading, data, error, refetch, isFetched } = useQuery({
    queryKey: ["offers"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/homefix/orders-client/1");
        if (res.status === 200) {
          return res.data.data || {};
        }
      } catch (error) {
        console.error("Error fetching offers:", error.message);
        throw error;
      }
    },
    enabled,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error, refetch, isFetched };
}
