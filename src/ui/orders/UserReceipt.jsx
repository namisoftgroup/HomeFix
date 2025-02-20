import { useTranslation } from "react-i18next";

export default function UserReceipt({ orderDetails }) {
  const { t } = useTranslation();
  return (
    <div className="user_receipt">
      <h5>{t("workCost")}</h5>

      <div className="product_list">
        <h6>{t("productsAndMaterials")}</h6>
        <ul>
          {orderDetails?.order_items?.map((item, index) => (
            <li key={index}>
              <h6>{item?.item_name}</h6>
              <p>
                <b>{item?.item_price}</b> {t("dinar")}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <ul className="total_cost_list">
        <li>
          <h6>{t("maintenanceCost")}</h6>
          <p>
            <b>{orderDetails?.maintenance_cost}</b> {t("dinar")}
          </p>
        </li>

        <li className="line"></li>

        <li>
          <h6>{t("totalCost")}</h6>
          <p>
            <b>{orderDetails?.total_cost}</b> {t("dinar")}
          </p>
        </li>
      </ul>
    </div>
  );
}
