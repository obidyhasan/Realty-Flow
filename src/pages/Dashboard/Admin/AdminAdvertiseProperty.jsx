import TitleSection from "../../../components/TitleSection";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { showConfirmDialog } from "../../../utility/SweetAlert";
import { showErrorToast, showSuccessToast } from "../../../utility/ShowToast";
import { Helmet } from "react-helmet";

const AdminAdvertiseProperty = () => {
  const axiosSecure = useAxiosSecure();
  const { data: properties = [], isPending } = useQuery({
    queryKey: ["advertise-property"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/admin/properties/verified");
      return res.data;
    },
  });

  function handelAdvertiseProperty(property) {
    showConfirmDialog(
      "Are you sure to advertise this property?",
      "Advertise it"
    ).then((res) => {
      if (res.isConfirmed) {
        const advertiseInfo = {
          ...property,
          propertyId: property?._id,
        };
        delete advertiseInfo?._id;

        axiosSecure
          .post("/api/advertise/property", advertiseInfo)
          .then((result) => {
            if (result?.data?.insertedId) {
              showSuccessToast("Advertise successfully");
            }
          })
          .catch((error) => {
            console.log(error);
            showErrorToast(error.message);
          });
      }
    });
  }

  return (
    <div>
      <Helmet>
        <title>Realty Flow - Advertise Property</title>
      </Helmet>
      <TitleSection
        title={"Advertise Property"}
        description={
          "Showcase your property to a wide audience with ease. Create eye-catching listings to attract potential buyers or renters quickly."
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
                      <th>Image</th>
                      <th>Property Title</th>
                      <th>Agent</th>
                      <th>Price Range</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map((property, idx) => (
                      <tr key={property._id}>
                        <th>{idx + 1}</th>
                        <td>
                          <img
                            src={property?.image}
                            className="w-12 h-12 object-cover rounded-lg"
                            alt=""
                          />
                        </td>

                        <td>
                          <div>
                            <h2 className="font-semibold text-base">
                              {property?.title}
                            </h2>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h2 className="font-medium text-base">
                              {property?.agent?.name}
                            </h2>
                          </div>
                        </td>

                        <td>
                          <p className="text-base font-semibold">
                            ${property?.priceRange.min} -{" "}
                            {property?.priceRange?.max}
                          </p>
                        </td>
                        <td>
                          <button
                            onClick={() => handelAdvertiseProperty(property)}
                            className="btn bg-primary hover:bg-primary-light border-none"
                          >
                            Advertise
                          </button>
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

export default AdminAdvertiseProperty;
