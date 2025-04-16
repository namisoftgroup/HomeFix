import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetCities() {
  const { lang } = useSelector((state) => state.language);

  const { isLoading, data, error } = useQuery({
    queryKey: ["cities", lang],
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
  });
  return { isLoading, data, error };
}
