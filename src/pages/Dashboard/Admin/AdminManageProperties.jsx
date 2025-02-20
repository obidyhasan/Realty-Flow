import { useQuery } from "@tanstack/react-query";
import TitleSection from "../../../components/TitleSection";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaLocationArrow } from "react-icons/fa";
import { showErrorToast, showSuccessToast } from "../../../utility/ShowToast";
import { Helmet } from "react-helmet";

const AdminManageProperties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: properties = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["all-properties", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/properties");
      return res.data;
    },
  });

  function handelRejectBtn(id) {
    axiosSecure
      .patch(`/api/property/status/${id}`, { verificationStatus: "Rejected" })
      .then((res) => {
        if (res.data.modifiedCount) {
          showSuccessToast("Rejected Property");
          refetch();
        }
      })
      .catch((error) => {
        console.log(error);
        showErrorToast(error.message);
      });
  }

  function handelVerifyBtn(id) {
    axiosSecure
      .patch(`/api/property/status/${id}`, { verificationStatus: "Verified" })
      .then((res) => {
        if (res.data.modifiedCount) {
          showSuccessToast("Verified Property");
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
      <Helmet>
        <title>Realty Flow - Manage Properties</title>
      </Helmet>
      <TitleSection
        title={"Centralized Property"}
        description={
          "Control and organize property listings to maintain a seamless platform experience for all users."
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
                      <th>Agent</th>
                      <th>Price Range</th>
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
                              {property?.agent?.name}
                            </h2>
                            <p className="text-gray-600 text-sm font-medium">
                              {property?.agent?.email}
                            </p>
                          </div>
                        </td>
                        <td>
                          <p className="text-base font-semibold">
                            ${property?.priceRange.min} -{" "}
                            {property?.priceRange?.max}
                          </p>
                        </td>
                        <td>
                          {property?.verificationStatus === "Pending" ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handelVerifyBtn(property?._id)}
                                className="btn btn-sm btn-outline text-xs btn-success"
                              >
                                Verify
                              </button>
                              <button
                                onClick={() => handelRejectBtn(property?._id)}
                                className="btn btn-sm btn-outline text-xs btn-error"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <div className="badge">
                              {property?.verificationStatus}
                            </div>
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

export default AdminManageProperties;
