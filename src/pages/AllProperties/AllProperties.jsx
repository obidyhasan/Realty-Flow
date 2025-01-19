import { FiSearch } from "react-icons/fi";
import Headline from "../../components/Headline";
import PropertyCard from "../../components/PropertyCard";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Helmet } from "react-helmet";

const AllProperties = () => {
  // const [properties, isPending] = useAllProperties();

  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(false);

  const { data: properties = [], isPending } = useQuery({
    queryKey: ["all-properties", search, sort],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/all-properties?search=${search}&sort=${sort}`
      );
      return res.data;
    },
  });

  function handelSearchFunction(e) {
    setSearch(e.target.value);
  }

  return (
    <div>
      <Helmet>
        <title>Realty Flow - All Properties</title>
      </Helmet>
      <div className="max-w-screen-2xl mx-auto my-10 px-5">
        <div className="">
          <Headline
            headline={"Explore All Properties"}
            subHeadline={
              "Discover properties across prime locations with detailed pricing and verified status. Your dream property is just a click away."
            }
          ></Headline>
          {/* Search functionality */}
          <div className="flex justify-center items-center gap-4 mt-8 sm:flex-row flex-col">
            <label className="input input-bordered rounded-full flex items-center gap-2 w-full max-w-2xl">
              <input
                onChange={handelSearchFunction}
                type="text"
                className="grow w-full"
                placeholder="Search by location"
              />
              <FiSearch />
            </label>
            <button
              onClick={() => setSort(!sort)}
              className={`btn rounded-full border-primary hover:bg-primary hover:border-primary ${
                sort ? "bg-primary" : "bg-primary-light"
              }`}
            >
              Sort By Price
            </button>
          </div>
        </div>

        {/* all properties card */}
        <div>
          {isPending ? (
            <div className="my-20 flex items-center justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <div>
              {properties.length ? (
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {properties.map((property) => (
                    <PropertyCard
                      key={property._id}
                      property={property}
                      fromAgent={false}
                    ></PropertyCard>
                  ))}
                </div>
              ) : (
                <div className="mt-10 text-center font-semibold text-xl border p-4 rounded-md border-base-200">
                  <h1>Properties Not Found</h1>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProperties;
