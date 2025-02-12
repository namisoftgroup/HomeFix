import { Autoplay } from "swiper/modules";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import useGetHomeSlider from "./../../hooks/home/useGetHomeSlider";

export default function Hero() {
  const { data: slider } = useGetHomeSlider();

  return (
    <div className="hero-section">
      <div className="container">
        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          speed={2000}
          loop={true}
          className="hero_slider"
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
        >
          {slider?.map((slide) => (
            <SwiperSlide key={slide?.id}>
              <div className="img">
                <img src={slide?.image} alt={slide?.title} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
