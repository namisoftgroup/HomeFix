import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetUserData() {
  const { lang } = useSelector((state) => state.language);

  const { isLoading, data, error } = useQuery({
    queryKey: ["user-data", lang],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/homefix/user-data");
        if (res.status === 200) {
          return res.data.data || {};
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
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
