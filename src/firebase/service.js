import { getToken, messaging, onMessage } from "./config";
import axiosInstance from "../utils/axiosInstance";

const sendTokenToServer = async (token) => {
  const prevToken = localStorage.getItem("firebase_token");
  if (prevToken === token) return;

  try {
    const response = await axiosInstance.post("/auth/firebase-token", {
      token,
      type: "web",
    });

    if (response.status === 200) {
      console.log("Token sent to server successfully:", response.data);
      localStorage.setItem("firebase_token", token);
    }
  } catch (error) {
    console.error("Error sending token to server:", error);
  }
};

const requestPermission = async () => {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  
  if (isSafari && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
    console.log("iOS Safari doesn't support web notifications");
    return;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;

    console.log("Notification permission granted.");

    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    console.log("Service Worker registered:", registration);

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    console.log("FCM Token:", token);

    if (token) {
      await sendTokenToServer(token);
    }
  } catch (error) {
    console.error("Error getting permission or token:", error);
  }
};

const listenToMessages = (queryClient) => {
  const unsubscribe = onMessage(messaging, (payload) => {
    try {
      const { notification } = payload;

      if (!notification || Notification.permission !== "granted") return;

      if (document.visibilityState === "visible") {
        updateQueries(queryClient, payload);
        return;
      }

      const title = notification.title || "New Notification";
      const options = {
        body: notification.body || "",
        icon: "/images/fav.svg",
        tag: "notification",
        data: payload.data,
      };

      new Notification(title, options);
      updateQueries(queryClient, payload);
    } catch (error) {
      console.error("Error handling incoming message:", error);
    }
  });

  return unsubscribe;
};

const updateQueries = (queryClient, payload) => {
  queryClient.refetchQueries({ queryKey: ["notifications"] });
  queryClient.refetchQueries({ queryKey: ["user-data"] });

  if (payload.data?.notification_type === "order" && payload.data?.order_id) {
    queryClient.refetchQueries({
      queryKey: ["order-details", payload.data.order_id],
    });
    queryClient.refetchQueries({ queryKey: ["provider-orders"] });
    queryClient.refetchQueries({ queryKey: ["orders"] });
  }
};

export { requestPermission, listenToMessages };
