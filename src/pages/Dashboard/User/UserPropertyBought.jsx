import { useQuery } from "@tanstack/react-query";
import OfferCard from "../../../components/OfferCard";
import TitleSection from "../../../components/TitleSection";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const UserPropertyBought = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: properties = [], isPending } = useQuery({
    queryKey: ["property-bought", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/makeOffer/user/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <Helmet>
        <title>Realty Flow - Property Bought</title>
      </Helmet>
      <div className="my-5">
        <TitleSection
          title={"Property Bought"}
          description={
            "Track and manage your purchased properties in one place with detailed insights for easy reference."
          }
        ></TitleSection>
      </div>
      <div className="my-10">
        {isPending ? (
          <div className="my-10 flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div>
            {properties.length ? (
              <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                {properties.map((property) => (
                  <OfferCard key={property._id} property={property}></OfferCard>
                ))}
              </div>
            ) : (
              <div className="text-center font-semibold text-xl border p-4 rounded-md border-base-200">
                <h1>Properties Not Found</h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPropertyBought;
