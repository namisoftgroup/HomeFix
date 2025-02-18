import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetOffers() {
  const { isLoading, data, error } = useQuery({
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

    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return { isLoading, data, error };
}
