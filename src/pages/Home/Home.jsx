import AdvertisementSection from "./AdvertisementSection/AdvertisementSection";
import BannerSection from "./BannerSection/BannerSection";
import FAQSection from "./FAQSection/FAQSection";
import LatestReviewSection from "./LatestReview/LatestReviewSection";

const Home = () => {
  return (
    <div>
      <BannerSection></BannerSection>
      <AdvertisementSection></AdvertisementSection>
      <LatestReviewSection></LatestReviewSection>
      <FAQSection></FAQSection>
    </div>
  );
};

export default Home;
