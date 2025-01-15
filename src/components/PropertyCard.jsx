import PropTypes from "prop-types";
import { FaLocationArrow } from "react-icons/fa";

const PropertyCard = ({ property }) => {
  const { image, title, location, agent, verificationStatus, priceRange } =
    property;

  return (
    <div className="p-4 flex flex-col border border-base-200 rounded-xl">
      <div className="flex-1">
        <figure>
          <img
            src={image}
            className="w-full h-[200px] rounded-lg object-cover"
            alt=""
          />
        </figure>
        <div className="flex flex-col gap-2">
          <p className="badge mt-3">{verificationStatus}</p>
          <div className="space-y-1">
            <h1 className="font-semibold text-xl">{title}</h1>
            <h2 className="text-sm font-medium flex flex-wrap text-gray-600 items-center gap-2">
              <FaLocationArrow className="text-primary"></FaLocationArrow>{" "}
              <span>{location}</span>
            </h2>
          </div>

          <div className="flex">
            <p className="font-bold text-lg">
              $ {priceRange.min} - {priceRange.max}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <hr className="border-base-200 mt-2" />
        <div className="flex gap-3 items-center">
          <img
            src={agent.image}
            className="w-10 h-10 object-cover rounded-full"
            alt=""
          />
          <h2 className="font-semibold">{agent.name}</h2>
        </div>
        <button className="btn w-full bg-primary border-none hover:bg-primary-light">
          View Details
        </button>
      </div>
    </div>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.object,
};

export default PropertyCard;
