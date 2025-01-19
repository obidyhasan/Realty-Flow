import { Helmet } from "react-helmet";
import AdvertisementSection from "./AdvertisementSection/AdvertisementSection";
import BannerSection from "./BannerSection/BannerSection";
import FAQSection from "./FAQSection/FAQSection";
import LatestReviewSection from "./LatestReview/LatestReviewSection";
import ServiceSection from "./ServiceSection/ServiceSection";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Realty Flow - Real Estate Platform</title>
      </Helmet>
      <BannerSection></BannerSection>
      <AdvertisementSection></AdvertisementSection>
      <ServiceSection></ServiceSection>
      <LatestReviewSection></LatestReviewSection>
      <FAQSection></FAQSection>
    </div>
  );
};

export default Home;
