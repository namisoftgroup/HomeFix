import { useSelector } from "react-redux";
import ProviderOrders from "../routes/ProviderOrders";
import Home from "../routes/Home";

export default function RoleProvider() {
  const { client } = useSelector((state) => state.clientData);
  return <>{client?.type === "provider" ? <ProviderOrders /> : <Home />}</>;
}
