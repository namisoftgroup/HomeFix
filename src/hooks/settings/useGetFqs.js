import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetFqs(enabled) {
  const { isLoading, data, error, refetch, isFetched } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/homefix/fqs");
        if (res.status === 200) {
          return res.data.data || {};
        }
      } catch (error) {
        console.error("Error fetching FQS:", error.message);
        throw error;
      }
    },
    enabled,
  });
  return { isLoading, data, error, refetch, isFetched };
}
