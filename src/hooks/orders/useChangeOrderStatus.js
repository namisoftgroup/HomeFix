import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

export default function useChangeOrderStatus() {
  const { client } = useSelector((state) => state.clientData);

  async function changeStatus(request, orderId) {
    try {
      const response = await axiosInstance.post(
        `/homefix/${
          client?.type === "provider" ? "orders-provider" : "orders-client"
        }/${orderId}`,
        {
          ...request,
          _method: "put",
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating order status:", error.message);
      throw error;
    }
  }

  const { mutate: changeOrderStatus, isPending } = useMutation({
    mutationFn: ({ request, orderId }) => changeStatus(request, orderId),
  });

  return { changeOrderStatus, isPending };
}
