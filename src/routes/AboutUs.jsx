import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import DownloadApp from "./../ui/Home/Download";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <>
      <Container className="about-us">
        <Row>
          <Col md={7} className="text-content">
            <h2>{t("aboutUs.title")}</h2>
            <p>{t("aboutUs.description")}</p>

            <h3>{t("aboutUs.howItWorksTitle")}</h3>
            <ul>
              <li>{t("aboutUs.step1")}</li>
              <li>{t("aboutUs.step2")}</li>
              <li>{t("aboutUs.step3")}</li>
              <li>{t("aboutUs.step4")}</li>
            </ul>

            <h3>{t("aboutUs.featuresTitle")}</h3>
            <ul>
              <li>{t("aboutUs.feature1")}</li>
              <li>{t("aboutUs.feature2")}</li>
              <li>{t("aboutUs.feature3")}</li>
              <li>{t("aboutUs.feature4")}</li>
              <li>{t("aboutUs.feature5")}</li>
            </ul>

            <p className="final-message">{t("aboutUs.finalMessage")}</p>
          </Col>

          <Col md={5} className="image-content">
            <img src="/images/works.webp" alt="Download App" />
          </Col>
        </Row>
      </Container>
      
      <DownloadApp />
    </>
  );
};

export default AboutUs;
