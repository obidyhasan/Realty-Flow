import moment from "moment";
import PropTypes from "prop-types";
import { showConfirmDialog } from "../utility/SweetAlert";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { showErrorToast, showSuccessToast } from "../utility/ShowToast";

const UserReviewCard = ({ review, refetch }) => {
  const { _id, review: reviewText, property, reviewTimestamp } = review;
  const axiosSecure = useAxiosSecure();

  function handelReviewDelete() {
    showConfirmDialog("Are you sure to delete this review?", "Delete it").then(
      (res) => {
        if (res.isConfirmed) {
          axiosSecure
            .delete(`/api/review/${_id}`)
            .then((result) => {
              if (result.data.deletedCount) {
                showSuccessToast("Review delete successfully");
                refetch();
              }
            })
            .catch((error) => {
              console.log(error);
              showErrorToast(error.message);
            });
        }
      }
    );
  }

  return (
    <div className="border border-base-200 flex flex-col gap-3 rounded-md  p-4">
      <div className="flex flex-col gap-3 flex-1">
        <div className="space-y-1">
          <h1 className="font-semibold text-xl">{property[0]?.title}</h1>
          <p>{moment(reviewTimestamp).format("MMMM D YYYY")}</p>
        </div>
        <h2 className="text-lg font-semibold">{property[0]?.agent.name}</h2>
        <p className="text-gray-500">{reviewText}</p>
      </div>
      <button
        onClick={handelReviewDelete}
        className="btn w-full text-white bg-deleteColor border-none hover:bg-deleteColor"
      >
        Delete
      </button>
    </div>
  );
};

UserReviewCard.propTypes = {
  review: PropTypes.object,
  refetch: PropTypes.func,
};

export default UserReviewCard;
