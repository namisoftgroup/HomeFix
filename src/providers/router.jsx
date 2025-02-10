import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../routes/Home";
import PageNotFound from "../routes/PageNotFound";
import ServiceDetails from "../ui/services/ServiceDetails";
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

    ],
  },
]);
