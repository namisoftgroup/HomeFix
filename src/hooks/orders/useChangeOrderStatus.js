import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../utils/axiosInstance";

export default function useChangeOrderStatus() {
  const { mutate: changeStatus, isPending } = useMutation({
    mutationFn: ({ request, orderId }) => cancelFn(request, orderId),
  });

  return { changeStatus, isPending };
}

async function cancelFn(request, orderId) {
  try {
    const response = await axiosInstance.put(
      `/homefix/orders-client/${orderId}`,
      request
    );
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error.message);
    throw error;
  }
}
