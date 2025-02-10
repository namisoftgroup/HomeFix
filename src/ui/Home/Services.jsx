
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Row, Col, Card, Pagination, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Services() {
  const { t } = useTranslation();
  const services = [

    {
      id: 1,
      icon: "fa-solid fa-file-signature",
      title: t("Services.title1"),
      subtitle: t("Services.subtitle1"),
      image: "/images/service1.svg",
      link: "/services/1" 

    },
    {
      id: 2,
      icon: "fa-solid fa-list-check",
      title: t("Services.title2"),
      subtitle: t("Services.subtitle2"),
      image: "/images/service2.svg",
      link: "/services/2" 
    },
    {
      id: 3,
      icon: "fa-solid fa-shield-alt",
      title: t("Services.title3"),
      subtitle: t("Services.subtitle3"),
      image: "/images/service3.svg",
      link: "/services/3" 
    },
    {
      id: 4,
      icon: "fa-solid fa-cogs",
      title: t("Services.title4"),
      subtitle: t("Services.subtitle4"),
      image: "/images/service4.svg",
      link: "/services/4" 

    },
    {
      id: 5,
      icon: "fa-solid fa-truck",
      title: t("Services.title5"),
      subtitle: t("Services.subtitle5"),
      image: "/images/service5.svg",
      link: "/services/5" 

    },
    {
      id: 6,
      icon: "fa-solid fa-paint-roller",
      title: t("Services.title6"),
      subtitle: t("Services.subtitle6"),
      image: "/images/service6.svg",
      link: "/services/6" 

    },
    {
      id: 7,
      icon: "fa-solid fa-snowflake",
      title: t("Services.title7"),
      subtitle: t("Services.subtitle7"),
      image: "/images/service7.svg",
      link: "/services/7" 

    },
    {
      id: 8,
      icon: "fa-solid fa-bug",
      title: t("Services.title8"),
      subtitle: t("Services.subtitle8"),
      image: "/images/service8.svg",
      link: "/services/8" 

    },
    {
      id: 9,
      icon: "fa-solid fa-mobile-alt",
      title: t("Services.title9"),
      subtitle: t("Services.subtitle9"),
      image: "/images/service9.svg",
      link: "/services/9" 

    },
    {
      id: 10,
      icon: "fa-solid fa-broom",
      title: t("Services.title10"),
      subtitle: t("ServicesSec.subtitle10"),
      image: "/images/service10.svg",
      link: "/services/10" 

    },
    {
      id: 11,
      icon: "fa-solid fa-hammer",
      title: t("Services.title11"),
      subtitle: t("Services.subtitle11"),
      image: "/images/service11.svg",
      link: "/services/11" 

    },
    {
      id: 12,
      icon: "fa-solid fa-video",
      title: t("Services.title12"),
      subtitle: t("Services.subtitle12"),
      image: "/images/service12.svg",
      link: "/services/12" 

    },
    {
      id: 13,
      icon: "fa-solid fa-th",
      title: t("Services.title13"),
      subtitle: t("Services.subtitle13"),
      image: "/images/service13.svg",
      link: "/services/13" 

    },
    {
      id: 14,
      icon: "fa-solid fa-building",
      title: t("Services.title14"),
      subtitle: t("Services.subtitle14"),
      image: "/images/service14.svg",
      link: "/services/14" 

    }
  
  ];
 
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = services.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="services mt-4">
      <Container>
        <h2>{t("Services.serviceTitle")}</h2>
        <Row>
          {currentItems.map((service) => (
            <Col key={service.id} lg={3} md={4} className="mb-4">
              <Link to={`/services/${service.id}`} state={{ service }} style={{ textDecoration: "none", color: "inherit" }}>
                <Card className="service-card">
                  <div className="service-image">
                    <img src={service.image} alt={service.title} />
                  </div>
                  <Card.Body>
                    <Card.Title className="service-title">{service.title}</Card.Title>
                    <Card.Subtitle className="service-subtitle mb-2 text-muted">
                      {service.subtitle}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        {/* Pagination */}
        <Pagination className="pagination">
          {[...Array(Math.ceil(services.length / itemsPerPage)).keys()].map((number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => paginate(number + 1)}
              className="pagination-item"
              style={{
                color: "var(--white)",
                backgroundColor: "var(--second)",
                border: "none",
                margin: "0 5px",
              }}
            >
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>
    </section>
  );
}

