import { useTranslation } from "react-i18next";

export default function Receipt({ orderDetails }) {
  const { t } = useTranslation();
  return (
    <div className="product_list">
      <h6>{t("productsAndMaterials")}</h6>
      <ul>
        {orderDetails?.order_items?.map((item, index) => (
          <li key={index}>
            <h6>{item?.item_name}</h6>
            <div className="price_actions">
              <p>
                <b>{item?.item_price}</b> {t("dinar")}
              </p>
            </div>
          </li>
        ))}
        <li>
          <h6>{t("maintenanceCost")}</h6>
          <p>
            <b>{orderDetails?.maintenance_cost}</b> {t("dinar")}
          </p>
        </li>
        <li className="line"></li>
        <li>
          <h6>{t("productsTotal")}</h6>
          <p>
            <b>{orderDetails?.phptotal_item_cost}</b> {t("dinar")}
          </p>
        </li>
        <li>
          <h6>{t("commesionCost")}</h6>
          <p>
            <b>
              {(orderDetails?.maintenance_cost *
                orderDetails?.application_commission_percentage) /
                100}
            </b>{" "}
            {t("dinar")}
          </p>
        </li>
        <li className="line"></li>
        <li>
          <h6>{t("totalCost")}</h6>
          <p>
            <b>{orderDetails?.total_cost_after}</b> {t("dinar")}
          </p>
        </li>
      </ul>
    </div>
  );
}
