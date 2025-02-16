import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../routes/Home";
import PageNotFound from "../routes/PageNotFound";
import ServiceDetails from "../ui/services/ServiceDetails";
import Orders from "../routes/Orders";
import AboutUs from "../routes/AboutUs";
import Settings from "../routes/Settings";
import Terms from "../routes/Terms";
import FAQs from "../routes/FAQs";
import UserProfile from "../routes/UserProfile";
import Contact from "../routes/Contact";
import Notification from "../routes/Notification";
import OrderDetails from "../routes/OrderDetails";

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
        path: "/order-service",
        element: <ServiceDetails />,
      },
      {
        path: "Orders",
        element: <Orders />,
      },
      {
        path: "aboutus",
        element: <AboutUs />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "terms-and-conditions",
        element: <Terms />,
      },
      {
        path: "faq",
        element: <FAQs />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "contactus",
        element: <Contact />,
      },
      {
        path: "notifications",
        element: <Notification />,
      },
      {
        path: "order-details",
        element: <OrderDetails />,
      }
    ],
  },
]);
