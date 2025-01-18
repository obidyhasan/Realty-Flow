import { FaLocationArrow } from "react-icons/fa";
import TitleSection from "../../../components/TitleSection";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { showErrorToast, showSuccessToast } from "../../../utility/ShowToast";

const AgentRequestedProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: properties = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["requested-properties", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/makeOffer/agent/${user?.email}`);
      return res.data;
    },
  });

  function handelPropertyAccept() {}
  function handelPropertyReject(id) {
    axiosSecure
      .patch(`/api/makeOffer/status/${id}`, { status: "Rejected" })
      .then((res) => {
        if (res.data.modifiedCount) {
          showSuccessToast("Property offer rejected");
          refetch();
        }
      })
      .catch((error) => {
        console.log(error);
        showErrorToast(error.message);
      });
  }

  return (
    <div>
      <TitleSection
        title={"Requested Properties"}
        description={
          "View and manage properties you’ve requested or made offers on, keeping track of your interactions in one convenient section."
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
                      <th>Offered Price</th>
                      <th>Status</th>
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
                        <td>
                          {property?.status === "Pending" ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  handelPropertyAccept(property._id)
                                }
                                className="btn btn-sm btn-outline text-xs btn-success"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() =>
                                  handelPropertyReject(property._id)
                                }
                                className="btn btn-sm btn-outline text-xs btn-error"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <div className="badge">{property?.status}</div>
                          )}
                        </td>
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

export default AgentRequestedProperties;
