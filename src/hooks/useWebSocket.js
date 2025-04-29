import { useEffect, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import websocketService from "../utils/websocketService";

/**
 * خطاف مخصص لاستخدام خدمة WebSocket في المشروع
 * يوفر وظائف للاشتراك في أحداث WebSocket وإدارة الاتصال
 */
export default function useWebSocket() {
  const queryClient = useQueryClient();

  // الاتصال بخادم WebSocket عند تحميل المكون
  useEffect(() => {
    // محاولة الاتصال بخادم WebSocket
    websocketService.connect();

    // تنظيف الاتصال عند إزالة المكون
    return () => {
      // لا نقوم بقطع الاتصال هنا لأننا نريد الحفاظ على اتصال واحد في التطبيق
      // بدلاً من ذلك، سنقوم بإلغاء الاشتراكات فقط
    };
  }, []);

  // الاشتراك في تحديثات الطلبات
  const subscribeToOrderUpdates = useCallback(
    (callback) => {
      // الاشتراك في حدث تحديث الطلبات
      const unsubscribe = websocketService.subscribe("order_update", (data) => {
        // تحديث ذاكرة التخزين المؤقت لـ React Query
        if (data.order_id) {
          // إبطال استعلامات الطلبات ذات الصلة
          queryClient.invalidateQueries({ queryKey: ["orders"] });
          queryClient.invalidateQueries({ queryKey: ["provider-orders"] });
          queryClient.invalidateQueries({
            queryKey: ["order-details", data.order_id],
          });
        }

        // استدعاء وظيفة رد الاتصال المخصصة إذا تم توفيرها
        if (callback) {
          callback(data);
        }
      });

      return unsubscribe;
    },
    [queryClient]
  );

  // الاشتراك في تحديثات العروض
  const subscribeToOfferUpdates = useCallback(
    (callback) => {
      return websocketService.subscribe("offer_update", (data) => {
        // تحديث ذاكرة التخزين المؤقت لـ React Query
        if (data.order_id) {
          queryClient.invalidateQueries({
            queryKey: ["order-details", data.order_id],
          });
        }

        // استدعاء وظيفة رد الاتصال المخصصة إذا تم توفيرها
        if (callback) {
          callback(data);
        }
      });
    },
    [queryClient]
  );

  // إرسال رسالة عبر WebSocket
  const sendMessage = useCallback((type, data) => {
    return websocketService.sendMessage(type, data);
  }, []);

  // التحقق من حالة الاتصال
  const isConnected = useCallback(() => {
    return websocketService.isConnected();
  }, []);

  return {
    subscribeToOrderUpdates,
    subscribeToOfferUpdates,
    sendMessage,
    isConnected,
  };
}
