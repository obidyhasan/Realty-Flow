import PropTypes from "prop-types";
import { FaLocationArrow } from "react-icons/fa";
import { Link } from "react-router-dom";
import { showConfirmDialog } from "../utility/SweetAlert";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { showErrorToast, showSuccessToast } from "../utility/ShowToast";

const WishlistCard = ({ property, wishlistPropertyId, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { image, title, location, agent, verificationStatus, priceRange } =
    property;

  function handelDeleteWishProperty() {
    showConfirmDialog(
      "Are you sure to delete this property?",
      "Delete it"
    ).then((res) => {
      if (res.isConfirmed) {
        axiosSecure
          .delete(`/api/wishlist/${wishlistPropertyId}`)
          .then((res) => {
            if (res.data.deletedCount) {
              showSuccessToast("Property delete successfully");
              refetch();
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
        <div className="flex gap-3 ">
          <Link
            to={`/dashboard/user/make-an-offer/${wishlistPropertyId}`}
            className="btn flex-1 bg-updateColor text-white border-none hover:bg-updateColor"
          >
            Make an Offer
          </Link>
          <button
            onClick={handelDeleteWishProperty}
            className="btn flex-1 text-white bg-deleteColor border-none hover:bg-deleteColor"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

WishlistCard.propTypes = {
  property: PropTypes.object,
  refetch: PropTypes.func,
  wishlistPropertyId: PropTypes.string,
};

export default WishlistCard;
