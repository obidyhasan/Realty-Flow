import AdvertisementSection from "./AdvertisementSection/AdvertisementSection";
import BannerSection from "./BannerSection/BannerSection";
import FAQSection from "./FAQSection/FAQSection";
import LatestReviewSection from "./LatestReview/LatestReviewSection";
import ServiceSection from "./ServiceSection/ServiceSection";

const Home = () => {
  return (
    <div>
      <BannerSection></BannerSection>
      <AdvertisementSection></AdvertisementSection>
      <ServiceSection></ServiceSection>
      <LatestReviewSection></LatestReviewSection>
      <FAQSection></FAQSection>
    </div>
  );
};

export default Home;
