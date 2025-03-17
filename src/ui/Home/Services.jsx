import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useGetCategories from "../../hooks/home/useGetServices";

export default function Services() {
  const { t } = useTranslation();
  const { data: services } = useGetCategories();

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2">
            <h2 className="section-title">{t("Services.title")}</h2>
          </div>
          {services?.map((service) => (
            <div key={service.id} className="col-lg-3 col-6 p-2">
              <Link to={`/order-service?id=${service.id}`}>
                <div className="service-card">
                  <div className="service-image">
                    <img src={service?.image} alt={service?.title} />
                  </div>
                  <div className="content">
                    <h5 className="service-title">{service?.title}</h5>
                    <p className="service-subtitle mb-2 text-muted">
                      {service?.description}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
