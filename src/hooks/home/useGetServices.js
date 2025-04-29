import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import useWebSocket from "../useWebSocket";

function useGetServices() {
  const lang = useSelector((state) => state.language.lang);
  const { subscribeToOrderUpdates } = useWebSocket();

  // استخدام WebSocket للحصول على تحديثات الخدمات عند تغيير الطلبات
  useEffect(() => {
    const unsubscribe = subscribeToOrderUpdates();
    return () => unsubscribe();
  }, [subscribeToOrderUpdates]);

  const { isLoading, data, error } = useQuery({
    queryKey: ["services", lang],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/homefix/most-order-services");
        if (res.status === 200) {
          return res.data?.data;
        }
      } catch (error) {
        console.error("خطأ في جلب الخدمات:", error);
        throw new Error(error);
      }
    },
    // تحسين الأداء من خلال تقليل عدد الطلبات وزيادة وقت التخزين المؤقت
    staleTime: 10 * 60 * 1000, // 10 دقائق
    cacheTime: 30 * 60 * 1000, // 30 دقيقة
  });

  return { isLoading, data, error };
}

export default useGetServices;
