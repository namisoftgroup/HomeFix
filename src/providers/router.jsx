import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
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
import ProtectionProvider from "./ProtectionProvider";
import RoleProvider from "./RoleProvider";
import TechnicalOrder from "../routes/TechnicalOrder";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <RoleProvider />,
      },
      {
        path: ":id",
        element: <TechnicalOrder />,
      },
      {
        path: "order-service",
        element: (
          <ProtectionProvider>
            <ServiceDetails />
          </ProtectionProvider>
        ),
      },

      {
        path: "my-orders",
        children: [
          {
            index: true,
            element: (
              <ProtectionProvider>
                <Orders />
              </ProtectionProvider>
            ),
          },

          {
            path: ":id",
            element: (
              <ProtectionProvider>
                <OrderDetails />
              </ProtectionProvider>
            ),
          },
        ],
      },
      {
        path: "aboutus",
        element: <AboutUs />,
      },
      {
        path: "settings",
        element: (
          <ProtectionProvider>
            <Settings />
          </ProtectionProvider>
        ),
      },
      {
        path: "terms-and-conditions",
        element: <Terms />,
      },
      {
        path: "privacy",
        element: <Terms type="privacy" />,
      },
      {
        path: "faqs",
        element: <FAQs />,
      },
      {
        path: "edit-profile",
        element: (
          <ProtectionProvider>
            <UserProfile />
          </ProtectionProvider>
        ),
      },
      {
        path: "contactus",
        element: <Contact />,
      },
      {
        path: "notifications",
        element: <Notification />,
      },
    ],
  },
]);
