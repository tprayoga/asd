import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
// import 'swiper/css/navigation';
import Banner1 from '../../../assets/images/banner1.png';
import Banner2 from '../../../assets/images/banner2.png';
import Banner3 from '../../../assets/images/banner3.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';

const Carousel = () => {
  return (
    <Swiper
      spaceBetween={50}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 1,
          spaceBetween: 50,
        },
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper transform  duration-200 hover:scale-110"
    >
      <SwiperSlide className="">
        <img src={Banner1} alt="banner1" className=" rounded-xl w-full" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={Banner2} alt="banner2" className=" rounded-xl w-full" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={Banner3} alt="banner3" className=" rounded-xl w-full" />
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
