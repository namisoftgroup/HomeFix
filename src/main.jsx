import ReactDOM from "react-dom/client";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import websocketService from "./utils/websocketService";

import App from "./App";

// تهيئة اتصال WebSocket عند بدء التطبيق
store.subscribe(() => {
  const state = store.getState();
  const isAuthenticated = state.clientData?.client?.id;

  // إنشاء اتصال WebSocket فقط عندما يكون المستخدم مسجل الدخول
  if (isAuthenticated && !websocketService.isConnected()) {
    websocketService.connect();
  }
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/all.min.css";
import "./assets/styles/style.css";
import "swiper/css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>
);
