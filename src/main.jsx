import ReactDOM from "react-dom/client";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: false,
      staleTime: 0,
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
