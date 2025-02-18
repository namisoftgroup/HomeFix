export const handleChange = (e, setFormData) => {
  setFormData((prv) => ({
    ...prv,
    [e.target.name]: e.target.value,
  }));
};

export const getStatusValue = (order) => {
  if (order?.status === "new") return 1;
  if (order?.status === "accept") return 2;
  if (order?.status === "confirm_arrival") return 3;
  if (["set_maintenance_cost", "confirm_items"].includes(order?.status))
    return 4;
  if (["start_maintenance", "client_accept_cost"].includes(order?.status))
    return 5;
  if (
    ["end_maintenance", "confirm_collection", "set_images"].includes(
      order?.status
    ) &&
    !order?.isPaid
  )
    return 6;
  if (order?.status === "complete" || order?.isPaid) return 7;
};

export const getStatusText = (order, t) => {
  if (order?.status === "new") return t("orderStatus.new");
  if (order?.status === "accept") return t("orderStatus.accept");
  if (order?.status === "confirm_arrival")
    return t("orderStatus.arrivedAndInspected");
  if (["set_maintenance_cost", "confirm_items"].includes(order?.status))
    return t("orderStatus.finalCostReachedBeingDetermined");
  if (["start_maintenance", "client_accept_cost"].includes(order?.status))
    return t("orderStatus.inProgress");
  if (
    ["end_maintenance", "confirm_collection", "set_images"].includes(
      order?.status
    ) &&
    !order?.isPaid
  )
    return t("orderStatus.completedWaitingPayment");
  if (order?.status === "complete" || order?.isPaid)
    return t("orderStatus.done");
};
