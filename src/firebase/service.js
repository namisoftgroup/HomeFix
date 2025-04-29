import { getToken, messaging, onMessage } from "./config";
import { toast } from "sonner";
import axiosInstance from "../utils/axiosInstance";

const sendTokenToServer = async (token) => {
  const prevToken = localStorage.getItem("firebase_token");
  if (prevToken === token) return;

  try {
    // تحديد نوع الجهاز ونظام التشغيل
    const isSafari = localStorage.getItem("browser_is_safari") === "true";
    const isIOS = localStorage.getItem("device_is_ios") === "true";
    const deviceType = isIOS ? "ios" : "web";
    
    const response = await axiosInstance.post("/auth/firebase-token", {
      token,
      type: deviceType,
      browser: isSafari ? "safari" : navigator.userAgent.includes("Chrome") ? "chrome" : "other",
      platform: isIOS ? "ios" : navigator.platform
    });

    if (response.status === 200) {
      localStorage.setItem("firebase_token", token);
    }
  } catch (error) {
    console.error("Error sending token to server:", error);
  }
};

const requestPermission = async () => {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  // تخزين معلومات عن نوع المتصفح ونظام التشغيل
  localStorage.setItem("browser_is_safari", isSafari);
  localStorage.setItem("device_is_ios", isIOS);

  if (isSafari && isIOS) {
    console.log("iOS Safari doesn't fully support web notifications, using alternative method");
    // محاولة تسجيل رمز الجهاز بطريقة بديلة لـ iOS Safari
    try {
      // استخدام طريقة بديلة للحصول على رمز الجهاز لـ iOS Safari
      const deviceToken = localStorage.getItem("device_id") || `ios_${Date.now()}`;
      localStorage.setItem("device_id", deviceToken);
      await sendTokenToServer(deviceToken);
    } catch (error) {
      console.error("Error with iOS alternative method:", error);
    }
    return;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;

    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js"
    );

    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });

    if (token) {
      await sendTokenToServer(token);
    }
  } catch (error) {
    console.error("Error getting permission or token:", error);
  }
};

const listenToMessages = (
  refetchOrder,
  refetchOrders,
  refetchProviderOrders,
  refetchNotifications,
  refetchUserData
) => {
  // التحقق من نوع المتصفح ونظام التشغيل
  const isSafari = localStorage.getItem("browser_is_safari") === "true";
  const isIOS = localStorage.getItem("device_is_ios") === "true";
  
  // إذا كان المتصفح Safari على نظام iOS، نستخدم طريقة بديلة للإشعارات
  if (isSafari && isIOS) {
    console.log("Using alternative notification method for iOS Safari");
    
    // إنشاء مؤقت للتحقق من الإشعارات الجديدة كل دقيقة
    const checkInterval = setInterval(() => {
      refetchNotifications();
      refetchUserData();
    }, 60000); // كل دقيقة
    
    // إرجاع دالة لإيقاف المؤقت
    return () => clearInterval(checkInterval);
  }
  
  // للمتصفحات الأخرى، نستخدم Firebase Messaging كالمعتاد
  const unsubscribe = onMessage(messaging, (payload) => {
    try {
      const { notification } = payload;

      if (!notification || Notification.permission !== "granted") return;

      if (document.visibilityState === "visible") {
        updateQueries(
          refetchOrder,
          refetchProviderOrders,
          refetchOrders,
          refetchNotifications,
          refetchUserData,
          payload
        );
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
      toast.info(payload.notification?.title);

      updateQueries(
        refetchOrder,
        refetchProviderOrders,
        refetchOrders,
        refetchNotifications,
        refetchUserData,
        payload
      );
    } catch (error) {
      console.error("Error handling incoming message:", error);
    }
  });

  return unsubscribe;
};

const updateQueries = (
  refetchOrder,
  refetchProviderOrders,
  refetchOrders,
  refetchNotifications,
  refetchUserData,
  payload
) => {
  refetchNotifications();
  refetchUserData();

  if (payload.data?.notification_type === "order" && payload.data?.order_id) {
    refetchOrder();
    refetchProviderOrders();
    refetchOrders();
  }
};

export { requestPermission, listenToMessages };
