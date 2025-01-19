import Headline from "../../../components/Headline";
import AdvertisementCard from "../../../components/AdvertisementCard";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const AdvertisementSection = () => {
  const axiosPublic = useAxiosPublic();
  const { data: advertisements = [], isPending } = useQuery({
    queryKey: ["advertise"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/advertise");
      return res.data;
    },
  });

  return (
    <div>
      <div className="max-w-screen-2xl mx-auto px-5 py-16">
        <Headline
          headline={"Stand Out in the Market"}
          subHeadline={
            "Unlock the power of smart advertising with RealtyFlow. Reach more clients and make your listings shine."
          }
        ></Headline>

        <div className="mt-12">
          {isPending ? (
            <div className="my-20 flex items-center justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <div>
              {advertisements.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {advertisements.map((advertisement) => (
                    <AdvertisementCard
                      key={advertisement._id}
                      advertisement={advertisement}
                    ></AdvertisementCard>
                  ))}
                </div>
              ) : (
                <div className="mt-10 text-center font-semibold text-xl border p-4 rounded-md border-base-200">
                  <h1>Advertisement Not Found</h1>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvertisementSection;
