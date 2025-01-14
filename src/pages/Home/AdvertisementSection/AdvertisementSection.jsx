import { useEffect, useState } from "react";
import Headline from "../../../components/Headline";
import AdvertisementCard from "../../../components/AdvertisementCard";

const AdvertisementSection = () => {
  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    fetch("/advertisementData.json")
      .then((res) => res.json())
      .then((data) => setAdvertisements(data));
  }, []);

  return (
    <div>
      <div className="max-w-screen-2xl mx-auto px-5 py-16">
        <Headline
          headline={"Stand Out in the Market"}
          subHeadline={
            "Unlock the power of smart advertising with RealtyFlow. Reach more clients and make your listings shine."
          }
        ></Headline>
        <section className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {advertisements.map((advertisement) => (
              <AdvertisementCard
                key={advertisement._id}
                advertisement={advertisement}
              ></AdvertisementCard>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdvertisementSection;
