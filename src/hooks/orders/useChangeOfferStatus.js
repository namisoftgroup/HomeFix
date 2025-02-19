import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";

export default function useChangeOfferStatus() {
  const { client } = useSelector((state) => state.clientData);

  async function changeStatus(orderId, payload) {
    try {
      const response = await axiosInstance.put(
        `/homefix/${
          client?.type === "provider" ? "offers-provider" : "offers-client"
        }/${orderId}`,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error updating order status:", error.message);
      throw error;
    }
  }

  const { mutate: changeOfferStatus, isPending } = useMutation({
    mutationFn: ({ orderId, payload }) => changeStatus(orderId, payload),
  });

  return { changeOfferStatus, isPending };
}
