import { toast } from "sonner";
import { store } from "../redux/store";

class WebSocketService {
  constructor() {
    this.socket = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 10; // زيادة عدد محاولات إعادة الاتصال
    this.reconnectTimeout = null;
    this.listeners = new Map();
    this.connected = false;
    this.baseUrl = "wss://homefixapp.com/ws";
    this.heartbeatInterval = null;
    this.lastHeartbeatResponse = null;
  }

  connect() {
    // تجنب إنشاء اتصالات متعددة
    if (
      this.socket?.readyState === WebSocket.OPEN ||
      this.socket?.readyState === WebSocket.CONNECTING
    ) {
      return;
    }

    // إلغاء أي محاولات إعادة اتصال سابقة
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    try {
      // استخراج معرف المستخدم من Redux store
      const state = store.getState();
      const userId = state.clientData?.client?.id;
      const userType = state.clientData?.client?.type;

      if (!userId) {
        console.warn(
          "لم يتم العثور على معرف المستخدم، لن يتم الاتصال بـ WebSocket"
        );
        return;
      }

      // إنشاء اتصال WebSocket مع إرسال معرف المستخدم ونوعه
      this.socket = new WebSocket(
        `${this.baseUrl}?user_id=${userId}&user_type=${userType}`
      );

      // تعيين مهلة للاتصال
      const connectionTimeout = setTimeout(() => {
        if (this.socket && this.socket.readyState !== WebSocket.OPEN) {
          console.warn("انتهت مهلة اتصال WebSocket");
          this.socket.close();
        }
      }, 10000); // 10 ثوانٍ كحد أقصى للاتصال

      this.socket.onopen = () => {
        clearTimeout(connectionTimeout);
        console.log("تم الاتصال بخادم WebSocket");
        this.connected = true;
        this.reconnectAttempts = 0;

        // بدء نبضات القلب للتحقق من حالة الاتصال
        this.startHeartbeat();
      };

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleMessage(data);
        } catch (error) {
          console.error("خطأ في معالجة رسالة WebSocket:", error);
        }
      };

      this.socket.onclose = (event) => {
        this.connected = false;
        console.log(`اتصال WebSocket مغلق: ${event.code} ${event.reason}`);
        this.attemptReconnect();
      };

      this.socket.onerror = (error) => {
        console.error("خطأ في اتصال WebSocket:", error);
        // لا نقوم بإغلاق الاتصال هنا، سنترك ذلك لحدث onclose
        // في بعض الحالات، قد يحدث خطأ ولكن الاتصال يظل مفتوحًا
        // وهذا يفسر لماذا التحديثات لا تزال تعمل رغم ظهور أخطاء
      };
    } catch (error) {
      console.error("فشل في إنشاء اتصال WebSocket:", error);
    }
  }

  attemptReconnect() {
    // إعادة ضبط محاولات الاتصال إذا كان الاتصال مغلقًا بشكل طبيعي
    if (this.socket && this.socket.readyState === WebSocket.CLOSED) {
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.log("تم الوصول إلى الحد الأقصى لمحاولات إعادة الاتصال");
        toast.error(
          "فشل الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت وإعادة تحميل الصفحة."
        );
        return;
      }

      this.reconnectAttempts++;
      // استخدام استراتيجية التأخير التدريجي مع عشوائية لتجنب تزامن إعادة الاتصال
      const baseDelay = Math.min(
        1000 * Math.pow(1.5, this.reconnectAttempts),
        15000
      );
      const jitter = Math.random() * 1000; // إضافة عشوائية لتجنب تزامن إعادة الاتصال
      const delay = baseDelay + jitter;

      console.log(
        `محاولة إعادة الاتصال بعد ${Math.round(delay)}ms (محاولة ${
          this.reconnectAttempts
        }/${this.maxReconnectAttempts})`
      );

      // إذا كانت هذه المحاولة الأولى، نعرض إشعارًا للمستخدم
      if (this.reconnectAttempts === 1) {
        toast.info("جاري إعادة الاتصال بالخادم...");
      }

      this.reconnectTimeout = setTimeout(() => {
        this.connect();
      }, delay);
    } else {
      // إذا كان الاتصال لا يزال مفتوحًا أو في حالة اتصال، نحاول إغلاقه أولاً
      if (this.socket) {
        try {
          this.socket.close();
        } catch (err) {
          console.error("خطأ أثناء إغلاق اتصال WebSocket:", err);
        }
      }

      // ثم نحاول إعادة الاتصال بعد فترة قصيرة
      setTimeout(() => this.connect(), 1000);
    }
  }

  disconnect() {
    // إيقاف نبضات القلب
    this.stopHeartbeat();

    if (this.socket) {
      try {
        this.socket.close();
      } catch (err) {
        console.error("خطأ أثناء إغلاق اتصال WebSocket:", err);
      }
      this.socket = null;
    }

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    this.connected = false;
    this.listeners.clear();
    console.log("تم قطع اتصال WebSocket");
  }

  handleMessage(data) {
    // معالجة الرسائل الواردة من الخادم
    console.log("رسالة WebSocket واردة:", data);

    // معالجة استجابات نبضات القلب
    if (data.type === "heartbeat_response") {
      this.handleHeartbeatResponse(data);
      return; // لا داعي لمعالجة إضافية لاستجابات نبضات القلب
    }

    // إذا كانت الرسالة تحتوي على نوع، استدعاء المستمعين المسجلين لهذا النوع
    if (data.type) {
      const listeners = this.listeners.get(data.type) || [];
      listeners.forEach((callback) => callback(data));

      // إظهار إشعار للمستخدم إذا كان هناك رسالة
      if (data.message) {
        toast.info(data.message);
      }
    }

    // معالجة تحديثات الطلبات
    if (data.type === "order_update") {
      // استدعاء المستمعين المسجلين لتحديثات الطلبات
      const orderListeners = this.listeners.get("order_update") || [];
      orderListeners.forEach((callback) => callback(data));
    }
  }

  subscribe(eventType, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }

    this.listeners.get(eventType).push(callback);
    return () => this.unsubscribe(eventType, callback);
  }

  unsubscribe(eventType, callback) {
    if (!this.listeners.has(eventType)) return;

    const listeners = this.listeners.get(eventType);
    const index = listeners.indexOf(callback);

    if (index !== -1) {
      listeners.splice(index, 1);
    }
  }

  sendMessage(type, data) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      console.warn("محاولة إرسال رسالة بينما WebSocket غير متصل");
      // محاولة إعادة الاتصال إذا كان الاتصال مغلقًا
      if (!this.socket || this.socket.readyState === WebSocket.CLOSED) {
        this.connect();
      }
      return false;
    }

    try {
      const message = JSON.stringify({
        type,
        ...data,
      });

      this.socket.send(message);
      return true;
    } catch (error) {
      console.error("خطأ في إرسال رسالة WebSocket:", error);
      return false;
    }
  }

  isConnected() {
    return this.connected;
  }

  // إضافة وظائف نبضات القلب للتحقق من حالة الاتصال
  startHeartbeat() {
    this.stopHeartbeat(); // إيقاف أي نبضات قلب سابقة

    this.heartbeatInterval = setInterval(() => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        // إرسال نبضة قلب كل 30 ثانية
        this.sendMessage("heartbeat", { timestamp: Date.now() });

        // التحقق من آخر استجابة لنبضة القلب
        const now = Date.now();
        if (
          this.lastHeartbeatResponse &&
          now - this.lastHeartbeatResponse > 60000
        ) {
          // إذا لم نتلق استجابة لأكثر من دقيقة، نعيد الاتصال
          console.warn("لم يتم تلقي استجابة لنبضات القلب، إعادة الاتصال...");
          this.socket.close();
        }
      }
    }, 30000); // كل 30 ثانية
  }

  stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  // تحديث معالجة الرسائل لدعم استجابات نبضات القلب
  handleHeartbeatResponse(data) {
    this.lastHeartbeatResponse = Date.now();
    // يمكن إضافة منطق إضافي هنا إذا لزم الأمر
  }
}

// إنشاء نسخة واحدة من الخدمة للاستخدام في جميع أنحاء التطبيق
const websocketService = new WebSocketService();

export default websocketService;
