import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BannerSection = () => {
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    fetch("/sliderData.json")
      .then((res) => res.json())
      .then((data) => setSliders(data));
  }, []);

  return (
    <div className="w-full h-[70vh]">
      <div className="relative">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper w-full h-[70vh]"
        >
          {sliders.map((slider) => (
            <SwiperSlide key={slider._id}>
              <div>
                <figure className=" w-full h-[70vh]">
                  <img
                    src={slider.image}
                    className="w-full h-full object-cover object-center"
                    alt=""
                  />
                </figure>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="z-10 w-full h-full bg-[#0000009f] absolute top-0 left-0">
          <div className="w-full h-full">
            <div className="max-w-7xl h-full mx-auto px-5 flex flex-col items-center justify-center text-white text-center">
              <h1 className="font-bold text-4xl leading-tight md:text-5xl lg:text-6xl max-w-4xl lg:leading-tight md:leading-tight ">
                Your Gateway to{" "}
                <span className="text-primary underline">Real Estate</span>{" "}
                Opportunities
              </h1>
              <p className="my-5 max-w-3xl text-base-200 text-xs sm:text-sm">
                RealtyFlow simplifies real estate by connecting buyers, sellers,
                and renters with verified listings, smart filters, and powerful
                tools for seamless transactions.
              </p>
              <Link
                to={"/all-properties"}
                className="btn bg-primary border-none hover:bg-primary transform duration-300 hover:translate-x-2"
              >
                Explore All Properties
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
