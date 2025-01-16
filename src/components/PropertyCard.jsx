import PropTypes from "prop-types";
import { FaLocationArrow } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { showErrorToast, showSuccessToast } from "../utility/ShowToast";
import useMyProperties from "../hooks/useMyProperties";
import { Link } from "react-router-dom";

const PropertyCard = ({ property, fromAgent }) => {
  const { _id, image, title, location, agent, verificationStatus, priceRange } =
    property;

  const [, , refetch] = useMyProperties();
  const axiosSecure = useAxiosSecure();

  function handelPropertyDelete() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/api/properties/${_id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              refetch();
              showSuccessToast("Property delete successfully");
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
      <div className="flex flex-col gap-[10px]">
        <hr className="border-base-200 mt-2" />
        <div className="flex gap-3 items-center">
          <img
            src={agent.image}
            className="w-10 h-10 object-cover rounded-full"
            alt=""
          />
          <h2 className="font-semibold">{agent.name}</h2>
        </div>
        {fromAgent ? (
          <div className="flex gap-3 ">
            <Link
              to={`/dashboard/agent/update-property/${_id}`}
              disabled={verificationStatus === "Rejected"}
              className="btn flex-1 bg-updateColor text-white border-none hover:bg-updateColor"
            >
              Update
            </Link>
            <button
              onClick={handelPropertyDelete}
              className="btn flex-1 text-white bg-deleteColor border-none hover:bg-deleteColor"
            >
              Delete
            </button>
          </div>
        ) : (
          <button className="btn w-full bg-primary border-none hover:bg-primary-light">
            View Details
          </button>
        )}
      </div>
    </div>
  );
};

PropertyCard.propTypes = {
  property: PropTypes.object,
  fromAgent: PropTypes.bool,
};

export default PropertyCard;
