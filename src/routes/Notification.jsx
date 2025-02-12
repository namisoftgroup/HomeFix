import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

const Notifications = () => {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications([
      { id: 1, title: t("notifications.title1"), description: t("notifications.description1"), time: t("notifications.time1")},
      { id: 2, title: t("notifications.title2"), description: t("notifications.description2"),  time: t("notifications.time2")} 
    ]);
  }, [t]); 

  const handleDelete = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  return (
    <section className="notifications-container container">
        <h2 className="notifications-title">{t("notifications.header")}</h2>


      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div key={notification.id} className="notification-item">
            <div className="notification-content">
              <h3>{notification.title}</h3>
              <p>{notification.description}</p>
              <span className="time">{notification.time}</span>
            </div>
            <i className="fa-solid fa-trash-can delete-icon" onClick={() => handleDelete(notification.id)}></i>

          </div>
        ))
      ) : (
        <p className="no-notifications">{t("notifications.noNotifications")}</p>
      )}
    </section>
  );
};

export default Notifications;
