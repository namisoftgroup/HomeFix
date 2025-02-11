import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../routes/Home";
import PageNotFound from "../routes/PageNotFound";
import ServiceDetails from "../ui/services/ServiceDetails";
import Orders from "../routes/Orders";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/services/:id",
        element: <ServiceDetails />,
      },
      {
        path: "Orders",
        element: <Orders />,
      },
      
    ],
  },
]);
