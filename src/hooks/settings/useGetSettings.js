import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetSettings() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/homefix/settings");
        if (res.status === 200) {
          return res.data.data || {};
        }
      } catch (error) {
        console.error("Error fetching settings:", error.message);
        throw error;
      }
    },
  });
  return { isLoading, data, error };
}
