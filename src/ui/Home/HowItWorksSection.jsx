import { useTranslation } from "react-i18next";

const HowItWorksSection = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: "fa-solid fa-plus",
      title: t("howItWorks.createRequest"),
      description: t("howItWorks.createRequestDesc"),
      delay: 100,
    },
    {
      icon: "fa-solid fa-bags-shopping",
      title: t("howItWorks.manageRequests"),
      description: t("howItWorks.manageRequestsDesc"),
      delay: 150,
    },
    {
      icon: "fa-solid fa-thumbs-up",
      title: t("howItWorks.chooseBestOffer"),
      description: t("howItWorks.chooseBestOfferDesc"),
      delay: 200,
    },
  ];

  const rightSteps = [
    {
      icon: "fa-solid fa-shop",
      title: t("howItWorks.startShopping"),
      description: t("howItWorks.startShoppingDesc"),
      delay: 100,
    },
    {
      icon: "fa-solid fa-file-signature",
      title: t("howItWorks.listServicesOrProducts"),
      description: t("howItWorks.listServicesOrProductsDesc"),
      delay: 150,
    },
    {
      icon: "fa-solid fa-comments",
      title: t("howItWorks.efficientCommunication"),
      description: t("howItWorks.efficientCommunicationDesc"),
      delay: 200,
    },
  ];

  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="container py-4">
        <h4 className="title text-center pt-3" data-aos="fade-up">
          {t("howItWorks.title")}
        </h4>
        <p className="subtitle text-center text-secondary-emphasis mb-5">
          {t("howItWorks.subtitle")}
        </p>
        <div className="row">
          <div className="col-lg-4 col-12 d-flex align-items-center justify-content-center">
            <div className="row h-100">
              {steps.map((step, index) => (
                <div className="col-12 d-flex align-items-center" key={index}>
                  <div className="h-card d-flex gap-2" data-aos="fade-up">
                    <div className="icon">
                      <i className={`fa-solid ${step.icon} fs-3 px-1`}></i>
                    </div>
                    <div className="text">
                      <h5>{step.title}</h5>
                      <p className="text-secondary-emphasis">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-4 col-12 text-center">
            <div className="mockup">
              <img
                src="/images/works.webp"
                className="img-fluid"
                alt="mockup"
              />
            </div>
          </div>

          <div className="col-lg-4 col-12 d-flex align-items-center justify-content-center">
            <div className="row h-100">
              {rightSteps.map((step, index) => (
                <div className="col-12 d-flex align-items-center" key={index}>
                  <div className="h-card left d-flex gap-2" data-aos="fade-up">
                    <div className="icon">
                      <i className={`${step.icon} fs-3 px-1`}></i>
                    </div>
                    <div className="text">
                      <h5>{step.title}</h5>
                      <p className="text-secondary-emphasis">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
