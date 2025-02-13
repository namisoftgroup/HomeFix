import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetCities(enabled) {
  const { isLoading, data, error, refetch, isFetched } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/homefix/cities");
        if (res.status === 200) {
          return res.data.data || {};
        }
      } catch (error) {
        console.error("Error fetching cities:", error.message);
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
