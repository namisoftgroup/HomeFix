import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useChangeOfferStatus() {
  const { mutate: changeOfferStatus, isPending } = useMutation({
    mutationFn: ({ status, orderId, offerId }) =>
      changeStatus(status, orderId, offerId),
  });

  return { changeOfferStatus, isPending };
}

async function changeStatus(status, orderId, offerId) {
  try {
    const response = await axiosInstance.put(
      `/homefix/offers-client/${orderId}`,
      {
        status,
        offer_id: offerId,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error.message);
    throw error;
  }
}
