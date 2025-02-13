import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useGetCategories from "./../../hooks/home/useGetCategories";

export default function Services() {
  const { t } = useTranslation();
  const { data: services } = useGetCategories();

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2 mb-3">
            <h2>{t("Services.title")}</h2>
            <p className="subtitle">{t("Services.description")}</p>
          </div>
          {services?.map((service) => (
            <div key={service.id} className="col-lg-3 col-md-6 col-12 p-2">
              <Link to={`/services/${service.id}`}>
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
