import { useTranslation } from "react-i18next";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import WorkCard from "../cards/WorkCard";
import "swiper/css";



const LatestWorks = () => {

  const { lang } = useSelector((state) => state.language);
  const { t } = useTranslation();
  const works = [
    { id: "work1", image: "/images/work1.jpg", title: t("Works.title1"), category: t("Works.category1") },
    { id: "work2", image: "/images/work2.jpg", title: t("Works.title2"), category: t("Works.category2") },
    { id: "work3", image: "/images/work3.jpg", title: t("Works.title3"), category: t("Works.category3") },
    { id: "work4", image: "/images/work4.jpg", title: t("Works.title4"), category: t("Works.category4") },
    { id: "work5", image: "/images/work5.jpg", title: t("Works.title5"), category: t("Works.category5") },
    { id: "work6", image: "/images/work3.jpg", title: t("Works.title3"), category: t("Works.category3") },
  ];
  return (
    <section className="latest-works">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2 mb-4">
            <div className="sec_header">
              <div className="section_title">
                <h2>{t("Works.title")}</h2>
                <p>
                 {t("Works.Desc")}
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 p-2">
            <Swiper
              slidesPerView={3}
              speed={1000}
              loop={true}
              modules={[Navigation, Autoplay]}
              spaceBetween={16}
              className="latest-works-swiper"
              dir={lang === "ar" ? "rtl" : "ltr"}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                0: { slidesPerView: 1 },
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
            >
              {works.map((work) => (
                <SwiperSlide key={work.id}>
                  <WorkCard {...work} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestWorks;
