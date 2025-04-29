import { toast } from "sonner";
import { store } from "../redux/store";

class WebSocketService {
  constructor() {
    this.socket = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 15;
    this.reconnectTimeout = null;
    this.listeners = new Map();
    this.connected = false;
    this.baseUrl = import.meta.env.DEV ? '/ws' : 'wss://homefixapp.com/ws';
    this.heartbeatInterval = null;
    this.lastHeartbeatResponse = null;
    this.connectionTimeout = 15000;
    this.lastErrorTime = null;
    this.errorCount = 0;
    this.connectionStats = {
      connectCount: 0,
      disconnectCount: 0,
      lastConnectTime: null,
      connectionDurations: [],
      disconnectReasons: {}
    };
    this.pingIntervalId = null;
    this.connectionTestInProgress = false;
  }

  connect() {
    if (
      this.socket?.readyState === WebSocket.OPEN ||
      this.socket?.readyState === WebSocket.CONNECTING
    ) {
      return;
    }

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.reconnectAttempts > 3 && !this.connectionTestInProgress) {
      this.testServerConnection();
    }

    try {
      const state = store.getState();
      const userId = state.clientData?.client?.id;
      const userType = state.clientData?.client?.type;

      if (!userId) {
        const errorMsg = "محاولة اتصال WebSocket فشلت: معرف المستخدم غير موجود";
        console.warn(errorMsg);
        toast.error(errorMsg);
        return;
      }

      const timestamp = new Date().getTime();
      const wsUrl = `${this.baseUrl}?user_id=${userId}&user_type=${userType}&t=${timestamp}&attempt=${this.reconnectAttempts}`;
      console.log(`محاولة اتصال WebSocket إلى: ${wsUrl}`);
      this.socket = new WebSocket(wsUrl);

      const dynamicTimeout = this.connectionTimeout * (1 + (this.reconnectAttempts * 0.2));
      const connectionTimeout = setTimeout(() => {
        if (this.socket && this.socket.readyState !== WebSocket.OPEN) {
          const errorMsg = `انتهت مهلة اتصال WebSocket (${Math.round(dynamicTimeout)}ms)`;
          console.warn(errorMsg);
          toast.error(errorMsg);
          this.socket.close();
          this.attemptReconnect();
        }
      }, dynamicTimeout);

      this.socket.onopen = () => {
        clearTimeout(connectionTimeout);
        console.log("تم الاتصال بخادم WebSocket");
        this.connected = true;
        this.reconnectAttempts = 0;
        this.connectionStats.connectCount++;
        this.connectionStats.lastConnectTime = Date.now();
        
        if (this.connectionStats.disconnectCount > 0) {
          toast.success("تم إعادة الاتصال بالخادم بنجاح");
        }

        this.startHeartbeat();
        this.startPinging();
      };

      this.socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.handleMessage(data);
        } catch (error) {
          console.error("Error processing WebSocket message:", error);
        }
      };

      this.socket.onclose = (event) => {
        clearTimeout(connectionTimeout);
        this.connected = false;
        this.stopPinging();
        
        if (this.connectionStats.lastConnectTime) {
          const duration = Date.now() - this.connectionStats.lastConnectTime;
          this.connectionStats.connectionDurations.push(duration);
          if (this.connectionStats.connectionDurations.length > 10) {
            this.connectionStats.connectionDurations.shift();
          }
        }
        this.connectionStats.disconnectCount++;
        
        if (!this.connectionStats.disconnectReasons[event.code]) {
          this.connectionStats.disconnectReasons[event.code] = 0;
        }
        this.connectionStats.disconnectReasons[event.code]++;
        
        let closeReason = "";
        switch (event.code) {
          case 1000:
            closeReason = "إغلاق طبيعي";
            break;
          case 1001:
            closeReason = "المضيف قام بالانتقال";
            break;
          case 1002:
            closeReason = "خطأ في البروتوكول";
            break;
          case 1003:
            closeReason = "نوع بيانات غير مقبول";
            break;
          case 1005:
            closeReason = "لم يتم تحديد كود الإغلاق";
            break;
          case 1006:
            closeReason = "إغلاق غير طبيعي للاتصال";
            break;
          case 1007:
            closeReason = "بيانات غير صالحة";
            break;
          case 1008:
            closeReason = "رسالة انتهكت السياسة";
            break;
          case 1009:
            closeReason = "رسالة كبيرة جدًا";
            break;
          case 1010:
            closeReason = "الامتدادات المطلوبة مفقودة";
            break;
          case 1011:
            closeReason = "خطأ غير متوقع من الخادم";
            break;
          case 1012:
            closeReason = "إعادة تشغيل الخادم";
            break;
          case 1013:
            closeReason = "الخادم مشغول جدًا";
            break;
          case 1014:
            closeReason = "انتهى وقت الخادم في الإجابة";
            break;
          case 1015:
            closeReason = "فشل في التحقق من TLS";
            break;
          default:
            closeReason = "سبب غير معروف";
        }

        const closeMsg = `اتصال WebSocket مغلق: ${event.code} (${closeReason})${event.reason ? ` - السبب: ${event.reason}` : ''}`;
        console.log(closeMsg);
        
        if (event.code === 1006) {
          console.warn("تحليل انقطاع WebSocket (1006):", {
            متوسط_مدة_الاتصال: this.getAverageConnectionDuration(),
            عدد_الاتصالات: this.connectionStats.connectCount,
            عدد_الانقطاعات: this.connectionStats.disconnectCount,
            أسباب_الانقطاعات: this.connectionStats.disconnectReasons,
            آخر_استجابة_للنبض: this.lastHeartbeatResponse ? new Date(this.lastHeartbeatResponse).toISOString() : 'لا يوجد',
            محاولة_إعادة_الاتصال_الحالية: this.reconnectAttempts
          });
        }
        
        if (event.code !== 1000 && event.code !== 1001) {
          const now = Date.now();
          if (!this.lastErrorTime || now - this.lastErrorTime > 10000) {
            this.errorCount = 1;
          } else {
            this.errorCount++;
          }
          this.lastErrorTime = now;
          
          if (event.code === 1006 && this.connectionStats.disconnectReasons[1006] > 3) {
            const avgDuration = this.getAverageConnectionDuration();
            
            if (avgDuration < 5000) {
              if (this.errorCount <= 3) {
                toast.error(`مشكلة في استقرار الشبكة. جاري محاولة إعادة الاتصال...`);
              }
            } else if (avgDuration < 30000) {
              if (this.errorCount <= 2) {
                toast.error(`قد تكون هناك مشكلة في إعداد الخادم. جاري المحاولة مرة أخرى...`);
              }
            } else {
              if (this.errorCount <= 3) {
                toast.error(`انقطع الاتصال بالخادم. جاري إعادة الاتصال...`);
              }
            }
          } else {
            if (this.errorCount <= 3) {
              toast.error(`خطأ في اتصال WebSocket: ${closeReason}`);
            }
          }
          
          this.attemptReconnect();
        }
      };

      this.socket.onerror = (error) => {
        const errorDetails = {
          type: error.type,
          message: error.message || "لا توجد رسالة خطأ متاحة",
          target: {
            url: error.target?.url || "غير متاح",
            readyState: this.getReadyStateText(error.target?.readyState),
            protocol: error.target?.protocol || "غير متاح",
            extensions: error.target?.extensions || "غير متاح"
          }
        };
        
        console.error("خطأ في اتصال WebSocket:", errorDetails);
        
        const now = Date.now();
        if (!this.lastErrorTime || now - this.lastErrorTime > 10000) {
          this.errorCount = 1;
        } else {
          this.errorCount++;
        }
        this.lastErrorTime = now;
        
        if (this.errorCount <= 3) {
          toast.error(`خطأ في اتصال WebSocket: ${errorDetails.target.url} - ${errorDetails.message}`);
        }
      };
    } catch (error) {
      const errorMsg = `فشل في إنشاء اتصال WebSocket: ${error.message || 'خطأ غير معروف'}`;
      console.error(errorMsg, error);
      toast.error(errorMsg);
      this.attemptReconnect();
    }
  }

  attemptReconnect() {
    if (this.socket && this.socket.readyState === WebSocket.CLOSED) {
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        const maxAttemptsMsg = `تم الوصول إلى الحد الأقصى لمحاولات إعادة الاتصال (${this.maxReconnectAttempts})`;
        console.log(maxAttemptsMsg);
        toast.error(
          "فشل الاتصال بالخادم بعد عدة محاولات. يرجى التحقق من اتصال الإنترنت وإعادة تحميل الصفحة."
        );
        return;
      }

      this.reconnectAttempts++;
      const baseDelay = Math.min(
        1000 * Math.pow(1.5, this.reconnectAttempts),
        15000
      );
      const jitter = Math.random() * 1000;
      const delay = baseDelay + jitter;

      console.log(
        `محاولة إعادة الاتصال بعد ${Math.round(delay)}ms (محاولة ${
          this.reconnectAttempts
        }/${this.maxReconnectAttempts})`
      );

      if (this.reconnectAttempts === 1) {
        toast.info("جاري إعادة الاتصال بالخادم...");
      }
      else if (this.reconnectAttempts % 3 === 0) {
        toast.info(`محاولة إعادة الاتصال ${this.reconnectAttempts} من ${this.maxReconnectAttempts}`);
      }

      this.reconnectTimeout = setTimeout(() => {
        this.connect();
      }, delay);
    } else {
      if (this.socket) {
        try {
          this.socket.close();
        } catch (err) {
          console.error("خطأ أثناء إغلاق اتصال WebSocket:", err);
        }
      }

      setTimeout(() => this.connect(), 1000);
    }
  }

  disconnect() {
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
    console.log("رسالة WebSocket واردة:", data);

    if (data.type === "heartbeat_response") {
      this.handleHeartbeatResponse(data);
      return;
    }

    if (data.type === "ping_response") {
      this.lastPingResponse = Date.now();
      const latency = this.lastPingResponse - data.timestamp;
      console.log(`تأخير WebSocket: ${latency}ms`);
      
      if (latency > 1000) {
        console.warn(`تأخير كبير في WebSocket (${latency}ms)، قد يؤدي هذا إلى عدم استقرار الاتصال`);
      }
      return;
    }

    if (data.type) {
      const listeners = this.listeners.get(data.type) || [];
      listeners.forEach((callback) => callback(data));

      if (data.message) {
        toast.info(data.message);
      }
    }

    if (data.type === "order_update") {
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

  startHeartbeat() {
    this.stopHeartbeat();

    this.heartbeatInterval = setInterval(() => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.sendMessage("heartbeat", { timestamp: Date.now() });

        const now = Date.now();
        if (
          this.lastHeartbeatResponse &&
          now - this.lastHeartbeatResponse > 60000
        ) {
          console.warn("لم يتم تلقي استجابة لنبضات القلب، إعادة الاتصال...");
          this.socket.close();
        }
      }
    }, 30000);
  }

  stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  handleHeartbeatResponse(data) {
    this.lastHeartbeatResponse = Date.now();
  }

  getReadyStateText(readyState) {
    switch (readyState) {
      case WebSocket.CONNECTING:
        return "جاري الاتصال (0)";
      case WebSocket.OPEN:
        return "متصل (1)";
      case WebSocket.CLOSING:
        return "جاري الإغلاق (2)";
      case WebSocket.CLOSED:
        return "مغلق (3)";
      default:
        return `غير معروف (${readyState})`;
    }
  }

  getAverageConnectionDuration() {
    if (this.connectionStats.connectionDurations.length === 0) {
      return 0;
    }
    const sum = this.connectionStats.connectionDurations.reduce((a, b) => a + b, 0);
    return Math.round(sum / this.connectionStats.connectionDurations.length);
  }

  testServerConnection() {
    if (this.connectionTestInProgress) return;
    
    this.connectionTestInProgress = true;
    console.log("جاري اختبار الاتصال بالخادم...");
    
    const startTime = Date.now();
    const serverUrl = this.baseUrl.startsWith('/') 
      ? window.location.origin + this.baseUrl.replace('ws', '')
      : this.baseUrl.replace('wss:', 'https:').replace('ws:', 'http:');
    
    const testUrl = `${serverUrl.includes('?') ? serverUrl + '&' : serverUrl + '?'}ping=${Date.now()}`;
    
    fetch(testUrl, { method: 'HEAD', cache: 'no-store' })
      .then(response => {
        const pingTime = Date.now() - startTime;
        console.log(`استجابة الخادم: ${response.status}, وقت الاستجابة: ${pingTime}ms`);
        
        if (response.ok) {
          if (pingTime > 500) {
            console.warn(`تأخر استجابة الخادم (${pingTime}ms)، قد يسبب هذا مشاكل في WebSocket`);
          }
        } else {
          console.error(`الخادم غير متاح، رمز الحالة: ${response.status}`);
          toast.error("الخادم غير متاح حاليًا، سنستمر في المحاولة");
        }
      })
      .catch(error => {
        console.error("خطأ أثناء اختبار الاتصال بالخادم:", error);
        toast.error("تعذر الوصول إلى الخادم، تحقق من اتصالك بالإنترنت");
      })
      .finally(() => {
        this.connectionTestInProgress = false;
      });
  }

  startPinging() {
    this.stopPinging();
    
    this.pingIntervalId = setInterval(() => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        const pingStart = Date.now();
        this.sendMessage("ping", { timestamp: pingStart });
        
        setTimeout(() => {
          if (this.lastPingResponse && this.lastPingResponse >= pingStart) {
          } else {
            console.warn("لم يتم تلقي استجابة ping، الاتصال قد يكون غير مستقر");
          }
        }, 5000);
      }
    }, 15000);
  }
  
  stopPinging() {
    if (this.pingIntervalId) {
      clearInterval(this.pingIntervalId);
      this.pingIntervalId = null;
    }
  }
}

const websocketService = new WebSocketService();

export default websocketService;
