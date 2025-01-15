import { FiSearch } from "react-icons/fi";
import Headline from "../../components/Headline";
import useAllProperties from "../../hooks/useAllProperties";
import PropertyCard from "../../components/PropertyCard";

const AllProperties = () => {
  const [properties] = useAllProperties();

  return (
    <div>
      <div className="max-w-screen-2xl mx-auto px-5">
        <div className="my-10">
          <Headline
            headline={"Explore All Properties"}
            subHeadline={
              "Discover properties across prime locations with detailed pricing and verified status. Your dream property is just a click away."
            }
          ></Headline>
          {/* Search functionality */}
          <div className="flex justify-center items-center gap-4 mt-8 sm:flex-row flex-col">
            <label className="input input-bordered rounded-full flex items-center gap-2 w-full max-w-2xl">
              <input type="text" className="grow w-full" placeholder="Search" />
              <FiSearch />
            </label>
            <button className="btn rounded-full bg-primary-light border-primary hover:bg-primary hover:border-primary">
              Sort By Price
            </button>
          </div>
        </div>

        {/* all properties card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {properties.map((property) => (
            <PropertyCard key={property._id} property={property}></PropertyCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProperties;
