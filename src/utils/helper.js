export const handleChange = (e, setFormData) => {
  setFormData((prv) => ({
    ...prv,
    [e.target.name]: e.target.value,
  }));
};

export const getStatusValue = (order) => {
  if (order?.is_paid) return 7;

  switch (order?.status) {
    case "new":
      return 1;
    case "accept":
      return 2;
    case "confirm_arrival":
      return 3;
    case "set_maintenance_cost":
      return 4;
    case "confirm_items":
      return 5;
    case "start_maintenance":
    case "client_accept_cost":
      return 6;
    case "end_maintenance":
    case "confirm_collection":
    case "set_images":
      return 7;
    case "complete":
      return 8;
    default:
      return 0;
  }
};

export const getStatusText = (order, t) => {
  if (order?.is_paid) return t("orderStatus.done");

  switch (order?.status) {
    case "new":
      return t("orderStatus.new");
    case "accept":
      return t("orderStatus.accept");
    case "confirm_arrival":
      return t("orderStatus.arrivedAndInspected");
    case "set_maintenance_cost":
      return t("orderStatus.settingMaintenanceCost");
    case "confirm_items":
      return t("orderStatus.confirmingItems");
    case "start_maintenance":
    case "client_accept_cost":
      return t("orderStatus.inProgress");
    case "end_maintenance":
    case "confirm_collection":
    case "set_images":
      return t("orderStatus.completedWaitingPayment");
    case "complete":
      return t("orderStatus.done");
    default:
      return t("orderStatus.unknown");
  }
};
