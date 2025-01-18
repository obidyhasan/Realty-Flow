import AdvertisementSection from "./AdvertisementSection/AdvertisementSection";
import BannerSection from "./BannerSection/BannerSection";
import LatestReviewSection from "./LatestReview/LatestReviewSection";

const Home = () => {
  return (
    <div>
      <BannerSection></BannerSection>
      <AdvertisementSection></AdvertisementSection>
      <LatestReviewSection></LatestReviewSection>
    </div>
  );
};

export default Home;
