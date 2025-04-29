// ملف خاص للتعامل مع الإشعارات على متصفح Safari في نظام iOS
import axiosInstance from "../utils/axiosInstance";

/**
 * وظيفة للتحقق من وجود إشعارات جديدة لمتصفح Safari على نظام iOS
 * @param {Function} refetchNotifications - وظيفة لتحديث الإشعارات
 * @param {Function} refetchUserData - وظيفة لتحديث بيانات المستخدم
 * @returns {Function} وظيفة لإيقاف التحقق من الإشعارات
 */
export const setupIOSSafariNotifications = (refetchNotifications, refetchUserData) => {
  // التحقق من نوع المتصفح ونظام التشغيل
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  // تخزين معلومات عن نوع المتصفح ونظام التشغيل
  localStorage.setItem("browser_is_safari", isSafari);
  localStorage.setItem("device_is_ios", isIOS);
  
  // إذا لم يكن المتصفح Safari على نظام iOS، لا نفعل شيئًا
  if (!isSafari || !isIOS) {
    return () => {};
  }
  
  console.log("Setting up iOS Safari notifications polling");
  
  // إنشاء معرف فريد للجهاز إذا لم يكن موجودًا
  if (!localStorage.getItem("device_id")) {
    const deviceId = `ios_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem("device_id", deviceId);
    
    // إرسال معرف الجهاز إلى الخادم
    sendDeviceIdToServer(deviceId);
  }
  
  // تحديث الإشعارات عند بدء التشغيل
  refetchNotifications();
  
  // إنشاء مؤقت للتحقق من الإشعارات الجديدة كل 30 ثانية
  const checkInterval = setInterval(() => {
    refetchNotifications();
    refetchUserData();
  }, 30000);
  
  // إضافة مستمع للتركيز على النافذة لتحديث الإشعارات
  const handleFocus = () => {
    refetchNotifications();
  };
  
  window.addEventListener('focus', handleFocus);
  
  // إرجاع دالة لإيقاف التحقق من الإشعارات
  return () => {
    clearInterval(checkInterval);
    window.removeEventListener('focus', handleFocus);
  };
};

/**
 * وظيفة لإرسال معرف الجهاز إلى الخادم
 * @param {string} deviceId - معرف الجهاز
 */
const sendDeviceIdToServer = async (deviceId) => {
  try {
    const response = await axiosInstance.post("/auth/firebase-token", {
      token: deviceId,
      type: "ios",
      browser: "safari",
      platform: "ios"
    });
    
    if (response.status === 200) {
      localStorage.setItem("firebase_token", deviceId);
      console.log("Device ID sent to server successfully");
    }
  } catch (error) {
    console.error("Error sending device ID to server:", error);
  }
};

/**
 * وظيفة لعرض إشعار محلي على متصفح Safari في نظام iOS
 * @param {string} title - عنوان الإشعار
 * @param {string} body - نص الإشعار
 */
export const showIOSNotification = (title, body) => {
  // التحقق من نوع المتصفح ونظام التشغيل
  const isSafari = localStorage.getItem("browser_is_safari") === "true";
  const isIOS = localStorage.getItem("device_is_ios") === "true";
  
  // إذا لم يكن المتصفح Safari على نظام iOS، لا نفعل شيئًا
  if (!isSafari || !isIOS) {
    return;
  }
  
  // عرض إشعار باستخدام واجهة المستخدم
  const notificationElement = document.createElement('div');
  notificationElement.className = 'ios-notification';
  notificationElement.innerHTML = `
    <div class="ios-notification-content">
      <h3>${title}</h3>
      <p>${body}</p>
    </div>
  `;
  
  document.body.appendChild(notificationElement);
  
  // إزالة الإشعار بعد 5 ثوانٍ
  setTimeout(() => {
    notificationElement.classList.add('ios-notification-hide');
    setTimeout(() => {
      document.body.removeChild(notificationElement);
    }, 500);
  }, 5000);
};