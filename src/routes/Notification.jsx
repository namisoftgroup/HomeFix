import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import useGetNotifications from "../hooks/settings/useGetNotifications";
import DataLoader from "../ui/loaders/DataLoader";
import axiosInstance from "../utils/axiosInstance";

const Notifications = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const { data: notifications, isLoading } = useGetNotifications();

  const handleDelete = async (id) => {
    setLoading(true);

    try {
      const res = await axiosInstance.delete(`/homefix/notification/${id}`);
      if (res?.data?.code === 200) {
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.error("Error deleting notification:", error.message);
      toast.error(t("errorOccurred"));
    } finally {
      setLoading(false);
    }
  };

  return isLoading ? (
    <DataLoader />
  ) : (
    <section className="notifications-container container">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-12 p-2">
          <h2 className="notifications-title mb-4">{t("notifications")}</h2>
          {notifications?.length > 0 ? (
            notifications?.map((notification) => (
              <div key={notification.id} className="notification-item">
                <div className="notification-content">
                  <h3>{notification.title}</h3>
                  <p>{notification.message}</p>
                  <span className="time">{notification.created_at}</span>
                </div>
                <button
                  disabled={loading}
                  onClick={() => handleDelete(notification.id)}
                >
                  <i className="fa-solid fa-trash-can delete-icon"></i>
                </button>
              </div>
            ))
          ) : (
            <p className="no-notifications">{t("noNotifications")}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Notifications;
