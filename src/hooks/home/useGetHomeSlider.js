import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetHomeSlider() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["home-slider"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/homefix/client-home");
        if (res?.data?.code === 200) {
          return res?.data?.data?.sliders;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return { isLoading, data, error };
}
