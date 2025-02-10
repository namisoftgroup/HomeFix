import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export default function Hero() {
    const { t } = useTranslation();

  return (
    <div className="hero-section">
      <Container>
        <Row>
          <Col md={6} className="text-content">
            <h2>
              <span>{t("hero_title")}</span> {t("hero_text")}
            </h2>
            <p>
            {t("hero_description")}
             
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
