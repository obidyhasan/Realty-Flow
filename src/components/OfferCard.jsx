import PropTypes from "prop-types";
import { FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router-dom";

const OfferCard = ({ property }) => {
  const { _id, image, title, location, agentName, offerAmount, status } =
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
          <p className="badge mt-3">{status}</p>
          <div className="space-y-1">
            <h1 className="font-semibold text-xl">{title}</h1>
            <h2 className="text-sm font-medium flex flex-wrap text-gray-600 items-center gap-2">
              <FaLocationArrow className="text-primary"></FaLocationArrow>{" "}
              <span>{location}</span>
            </h2>
          </div>

          <div className="flex">
            <p className="font-bold text-lg">Offer Price: $ {offerAmount}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[10px]">
        <hr className="border-base-200 mt-2" />
        <div className="flex gap-3 items-center">
          <h2 className="font-semibold">{agentName}</h2>
        </div>
        {status === "Bought" && property?.transactionId && (
          <h2 className="font-semibold">
            Transaction Id :{" "}
            <span className="font-medium badge ">
              {property?.transactionId}
            </span>
          </h2>
        )}
        {status === "Accepted" && (
          <Link
            to={`/dashboard/user/checkout/${_id}`}
            className="btn w-full bg-primary border-none hover:bg-primary-light"
          >
            Pay Now
          </Link>
        )}
      </div>
    </div>
  );
};

OfferCard.propTypes = {
  property: PropTypes.object,
};

export default OfferCard;
