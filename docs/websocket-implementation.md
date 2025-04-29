# تحسينات أداء مشروع HomeFix باستخدام WebSocket

## نظرة عامة

تم تحسين أداء مشروع HomeFix من خلال إضافة تقنية WebSocket للتواصل مع الخادم، مما يوفر تحديثات فورية للبيانات بدلاً من الاعتماد على استعلامات متكررة. هذا التحسين يقلل من عدد طلبات API ويحسن تجربة المستخدم بشكل كبير.

## التحسينات الرئيسية

### 1. إضافة خدمة WebSocket

تم إنشاء خدمة WebSocket مركزية (`websocketService.js`) تتيح:

- اتصال مستمر مع الخادم
- إعادة الاتصال التلقائي عند انقطاع الاتصال
- إدارة الاشتراكات في الأحداث المختلفة
- معالجة الرسائل الواردة من الخادم

### 2. خطاف React مخصص للـ WebSocket

تم إنشاء خطاف React مخصص (`useWebSocket.js`) يسهل استخدام خدمة WebSocket في مكونات React المختلفة، ويوفر:

- الاشتراك في تحديثات الطلبات
- الاشتراك في تحديثات العروض
- إرسال رسائل عبر WebSocket
- التحقق من حالة الاتصال

### 3. تحسين إدارة الحالة

تم تحسين إدارة الحالة في التطبيق من خلال:

- تحديث ذاكرة التخزين المؤقت لـ React Query تلقائيًا عند استلام تحديثات عبر WebSocket
- تقليل عدد استدعاءات `invalidateQueries` غير الضرورية
- زيادة وقت التخزين المؤقت للبيانات التي لا تتغير بشكل متكرر

### 4. تحسين أداء الاستعلامات

تم تحسين أداء استعلامات React Query من خلال:

- زيادة `staleTime` و `cacheTime` للاستعلامات
- الاعتماد على WebSocket للتحديثات الفورية بدلاً من إعادة الاستعلام المتكررة
- تقليل عدد طلبات API غير الضرورية

## كيفية الاستخدام

### الاشتراك في تحديثات الطلبات

```jsx
import useWebSocket from "../hooks/useWebSocket";

function MyComponent() {
  const { subscribeToOrderUpdates } = useWebSocket();

  useEffect(() => {
    const unsubscribe = subscribeToOrderUpdates((data) => {
      // معالجة تحديثات الطلبات هنا
      console.log("تم استلام تحديث للطلب:", data);
    });

    return () => unsubscribe();
  }, [subscribeToOrderUpdates]);

  // باقي الكود...
}
```

### الاشتراك في تحديثات العروض

```jsx
import useWebSocket from "../hooks/useWebSocket";

function MyComponent() {
  const { subscribeToOfferUpdates } = useWebSocket();

  useEffect(() => {
    const unsubscribe = subscribeToOfferUpdates((data) => {
      // معالجة تحديثات العروض هنا
      console.log("تم استلام تحديث للعروض:", data);
    });

    return () => unsubscribe();
  }, [subscribeToOfferUpdates]);

  // باقي الكود...
}
```

## ملاحظات هامة

- يتم إنشاء اتصال WebSocket تلقائيًا عند تسجيل دخول المستخدم
- يتم إعادة الاتصال تلقائيًا في حالة انقطاع الاتصال
- يتم تحديث ذاكرة التخزين المؤقت لـ React Query تلقائيًا عند استلام تحديثات عبر WebSocket
- لا حاجة لاستدعاء `invalidateQueries` يدويًا بعد إجراء تغييرات على البيانات
