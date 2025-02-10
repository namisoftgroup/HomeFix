import { useTranslation } from "react-i18next";

export default function WhyUs() {
  const { t } = useTranslation();

  const features = [
    {
      icon:"fa-solid fa-chart-column ",
      title: t("features.title1"),
      description: t("features.description1"),
    },
    {
      icon: "fa-solid fa-file-signature",
      title: t("features.title2"),
      description: t("features.description2"),
    },
    {
      icon: "fa-solid fa-list-check",
      title: t("features.title3"),
      description: t("features.description3"),
    },
  ];

  return (
    <section id="why-us" className="why-us">
      <div className="container my-2">
        <div className="row gy-4">
          {/* Why Choose Section */}
          <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
            <div className="why-box">
              <h3>{t("features.whyTitle")}</h3>
              <p>{t("features.whyDesc")}</p>
              <div className="text-center">
                <a href="#" className="more-btn">
                </a>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="col-lg-8 d-flex align-items-stretch">
            <div className="row " data-aos="fade-up" data-aos-delay="200">
              {features.map((feature, index) => (
                <div className="col-xl-4 mb-4" key={index} data-aos="fade-up" data-aos-delay={200 + index * 100}>
                  <div className="icon-box ">
                    <i className={feature.icon}></i>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
