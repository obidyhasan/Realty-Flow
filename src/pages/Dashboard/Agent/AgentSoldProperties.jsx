import { FaLocationArrow } from "react-icons/fa";
import TitleSection from "../../../components/TitleSection";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AgentSoldProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: properties = [], isPending } = useQuery({
    queryKey: ["sold-properties", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/makeOffer/sold/${user?.email}`);
      return res.data;
    },
  });

  console.log(properties);

  return (
    <div>
      <TitleSection
        title={"My Sold Properties"}
        description={
          "View and manage the properties you have successfully sold."
        }
      ></TitleSection>

      <div className="mt-10 mb-5">
        {isPending ? (
          <div className="my-10 flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div>
            {properties.length ? (
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Property</th>
                      <th>Buyer</th>
                      <th>Sold Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map((property, idx) => (
                      <tr key={property._id}>
                        <th>{idx + 1}</th>
                        <td>
                          <div>
                            <h2 className="font-semibold text-base">
                              {property?.title}
                            </h2>
                            <h2 className="text-sm font-medium flex text-gray-600 items-center gap-2 ">
                              <FaLocationArrow className="text-primary"></FaLocationArrow>{" "}
                              <span>{property?.location}</span>
                            </h2>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h2 className="font-semibold text-base">
                              {property?.buyerName}
                            </h2>
                            <p className="text-gray-600 text-sm font-medium">
                              {property?.buyerEmail}
                            </p>
                          </div>
                        </td>
                        <td>
                          <p className="text-base font-semibold">
                            ${property?.offerAmount}
                          </p>
                        </td>
                        <td></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

export default AgentSoldProperties;
