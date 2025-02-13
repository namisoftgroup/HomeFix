
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const DownloadApp = () => {
      const { t } = useTranslation();
    
  return (
    <Container className="download-app">
      <Row className="align-items-center">
      <Col md={6} className="image-content">
      <img src="/images/iPhone2 Pro.png" alt="downloadapp image" />

          
        </Col>
        <Col md={6} className="text-content">
        <h2>
            {t("Download")} <span className="highlight">{t("HomeFix")}</span> {t("App From Your Gadget.")}
          </h2>
          <p>{t("Download the app to explore deals and ease of booking.")}</p>
          <div className="download-buttons">
            <Link
                  aria-label="Android App"
                  target="_blank"
                  to="https://play.google.com/store/apps/details?id=com.apps.homefix"
                >
            <img src="/icons/playStore.svg" alt="Google Play" className="store-button" />
            </Link>

            <Link
                  aria-label="Apple App"
                  to="https://apps.apple.com/app/home-fix-technical/id6740774757"
                  target="_blank"
                >
            <img src="/icons/appStore.svg" alt="App Store" className="store-button" />
            </Link>
          </div>
        </Col>
      
      </Row>
    </Container>
  );
};

export default DownloadApp;