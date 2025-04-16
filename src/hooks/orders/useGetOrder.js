import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

export default function useGetOrder() {
  const { id } = useParams();
  const { client } = useSelector((state) => state.clientData);

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["order-details", id],

    queryFn: async () => {
      try {
        const res = await axiosInstance.get(
          `/homefix/${
            client?.type === "provider" ? "orders-provider" : "orders-client"
          }/${id}`
        );
        if (res.status === 200) {
          return res.data.data || {};
        }
      } catch (error) {
        console.error("Error fetching order:", error.message);
        throw error;
      }
    },

    enabled: !!id,
  });
  return { isLoading, data, error, refetch };
}
