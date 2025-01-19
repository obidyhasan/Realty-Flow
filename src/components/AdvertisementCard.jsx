import PropTypes from "prop-types";
import { FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdvertisementCard = ({ advertisement }) => {
  const { image, location, priceRange, verificationStatus } = advertisement;

  return (
    <div className="transform duration-300 hover:-translate-y-3">
      <div className="text-dark-01">
        <figure>
          <img
            src={image}
            className="w-full h-[220px] object-cover rounded-t-xl "
            alt=""
          />
        </figure>
        <div className="p-4 border border-t-0 border-base-200 rounded-b-xl flex flex-col">
          <div className="flex-1">
            <div className="flex gap-2 justify-between items-center">
              <h2 className="text-sm font-medium flex flex-wrap text-gray-600 items-center gap-2">
                <FaLocationArrow className="text-primary"></FaLocationArrow>{" "}
                <span>{location}</span>
              </h2>
              <p className="badge">{verificationStatus}</p>
            </div>
            <div className="flex">
              <p className="font-bold text-lg my-2">
                $ {priceRange.min} - {priceRange.max}
              </p>
            </div>
          </div>
          <Link
            to={`/property-details/${advertisement?.propertyId}`}
            className="btn w-full bg-primary border-none hover:bg-primary-light"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

AdvertisementCard.propTypes = {
  advertisement: PropTypes.object,
};

export default AdvertisementCard;
