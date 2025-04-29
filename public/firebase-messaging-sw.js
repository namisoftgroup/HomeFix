/* eslint-disable no-undef */
// تحميل مكتبات Firebase اللازمة لخدمة العامل
try {
  importScripts(
    "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
  );
  importScripts(
    "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
  );
  console.log("Firebase scripts loaded successfully");
} catch (error) {
  console.error("Error loading Firebase scripts:", error);
}

// التحقق من دعم المتصفح لخدمة العامل والإشعارات
const isSupported = self.registration && 'Notification' in self && 'PushManager' in self.registration;

// تهيئة Firebase فقط إذا كان المتصفح يدعم خدمة العامل والإشعارات
if (isSupported) {
  try {
    firebase.initializeApp({
      apiKey: "AIzaSyDEYa6bBTMLfJxj9oyZ16NcGLea15XcyvE",
      authDomain: "homefix-7223e.firebaseapp.com",
      projectId: "homefix-7223e",
      storageBucket: "homefix-7223e.firebasestorage.app",
      messagingSenderId: "585797706379",
      appId: "1:585797706379:web:09db821743b3836ec22a8e",
      measurementId: "G-VYZMWH30VP",
    });

    const messaging = firebase.messaging();

    // تخزين معلومات عن دعم الإشعارات
    self.addEventListener('activate', () => {
      console.log('Service Worker activated - Notifications supported');
    });

    // معالجة الإشعارات في الخلفية فقط إذا كان المتصفح يدعم ذلك
    messaging.onBackgroundMessage(async function (payload) {
      console.log("Received background message ", payload);

      try {
        // التحقق من وجود بيانات الإشعار
        if (!payload || !payload.notification) {
          console.warn("Received payload without notification data", payload);
          return;
        }

        const { title, body } = payload.notification;
        
        // التحقق من وجود العنوان والنص
        if (!title || !body) {
          console.warn("Notification missing title or body", payload.notification);
          return;
        }

        const notificationOptions = {
          body,
          icon: "/images/fav.svg",
          data: payload.data || {},
          tag: "notification",
          requireInteraction: true,
          badge: "/images/fav.svg", // إضافة شارة للإشعارات على iOS
          actions: [
            {
              action: "open",
              title: "Open",
            },
          ],
        };

        // التحقق من دعم الإشعارات قبل عرضها
        if (self.registration && self.registration.showNotification) {
          await self.registration.showNotification(title, notificationOptions);
          console.log("Notification displayed successfully");
        } else {
          console.warn("showNotification not supported in this browser");
        }
      } catch (error) {
        console.error("Error showing notification:", error);
      }
    });

    // معالجة النقر على الإشعارات فقط إذا كان المتصفح يدعم ذلك
    self.addEventListener("notificationclick", async function (event) {
      try {
        // إغلاق الإشعار
        event.notification.close();
        
        // استخراج البيانات من الإشعار إذا كانت موجودة
        const notificationData = event.notification.data || {};
        
        // تحديد المسار المراد فتحه (استخدام المسار من البيانات أو المسار الافتراضي)
        let urlToOpen = new URL("/", self.location.origin).href;
        
        // إذا كان هناك مسار محدد في بيانات الإشعار، استخدمه
        if (notificationData.url) {
          try {
            // التحقق من صحة المسار
            const customUrl = new URL(notificationData.url, self.location.origin);
            urlToOpen = customUrl.href;
          } catch (urlError) {
            console.error("Invalid URL in notification data:", urlError);
          }
        }
        
        console.log("Opening URL:", urlToOpen);
        
        // التحقق من دعم واجهة clients
        if (clients && typeof clients.matchAll === 'function') {
          const windowClients = await clients.matchAll({
            type: "window",
            includeUncontrolled: true,
          });

          // البحث عن نافذة مفتوحة بالفعل
          const existingClient = windowClients.find(client => {
            return client.url === urlToOpen || 
                  client.url.startsWith(self.location.origin + "/");
          });
          
          // إذا وجدت نافذة مفتوحة، قم بالتركيز عليها
          if (existingClient && typeof existingClient.focus === 'function') {
            await existingClient.focus();
          } else if (typeof clients.openWindow === 'function') {
            // إذا لم توجد نافذة مفتوحة، افتح نافذة جديدة
            await clients.openWindow(urlToOpen);
          } else {
            console.warn("clients.openWindow not supported");
          }
        } else {
          console.warn("clients API not fully supported, trying direct openWindow");
          // محاولة فتح نافذة مباشرة إذا كانت واجهة clients غير مدعومة بالكامل
          if (clients && typeof clients.openWindow === 'function') {
            await clients.openWindow(urlToOpen);
          }
        }
      } catch (error) {
        console.error("Error in notification click handler:", error);
        // محاولة أخيرة لفتح نافذة جديدة
        try {
          if (clients && typeof clients.openWindow === 'function') {
            await clients.openWindow(new URL("/", self.location.origin).href);
          }
        } catch (fallbackError) {
          console.error("Failed to open window as fallback:", fallbackError);
        }
      }
    });

    // إضافة مستمع لحدث التثبيت لتخزين الملفات في ذاكرة التخزين المؤقت
    self.addEventListener('install', (event) => {
      console.log('Service Worker installed');
      // Use waitUntil to ensure installation completes before moving forward
      event.waitUntil(
        // Skip waiting to activate the new service worker immediately
        Promise.all([
          self.skipWaiting(),
          // You can add cache operations here if needed
        ])
      );
    });
    // إضافة مستمع لحدث الرسائل لدعم التواصل مع صفحة الويب
    self.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'INIT_FIREBASE') {
        console.log('Received INIT_FIREBASE message from web page');
      }
    });
    
    // إضافة مستمع لحدث الخطأ لتسجيل الأخطاء
    self.addEventListener('error', (event) => {
      console.error('Service Worker error:', event.error);
    });
    
    // تسجيل معلومات عن المتصفح ونظام التشغيل
    console.log('Service Worker environment:', {
      userAgent: self.navigator ? self.navigator.userAgent : 'unavailable',
      serviceWorkerSupported: !!self.registration,
      notificationsSupported: 'Notification' in self,
      pushSupported: self.registration ? 'PushManager' in self.registration : false
    });

  } catch (error) {
    console.error("Error initializing Firebase:", error);
  }
}
