import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import useWebSocket from "../useWebSocket";

export default function useGetProviderOrders() {
  const [search] = useSearchParams();
  const type = search.get("type") || "new";
  const { subscribeToOrderUpdates } = useWebSocket();

  // استخدام WebSocket للاشتراك في تحديثات الطلبات
  useEffect(() => {
    // الاشتراك في تحديثات الطلبات
    const unsubscribe = subscribeToOrderUpdates();

    // إلغاء الاشتراك عند إزالة المكون
    return () => unsubscribe();
  }, [subscribeToOrderUpdates]);

  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["provider-orders", type],

    queryFn: async () => {
      try {
        const res = await axiosInstance.get(`/homefix/orders-provider`, {
          params: {
            type,
          },
        });
        if (res.status === 200) {
          return res.data.data || {};
        }
      } catch (error) {
        console.error("خطأ في جلب الطلبات:", error.message);
        throw error;
      }
    },
    // تقليل عدد مرات إعادة الاستعلام لتحسين الأداء
    // لأننا نعتمد الآن على WebSocket للتحديثات الفورية
    staleTime: 5 * 60 * 1000, // 5 دقائق
    cacheTime: 10 * 60 * 1000, // 10 دقائق
  });
  return { isLoading, data, error, refetch };
}
