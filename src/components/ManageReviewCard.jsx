import PropTypes from "prop-types";
import { showConfirmDialog } from "../utility/SweetAlert";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { showErrorToast, showSuccessToast } from "../utility/ShowToast";

const ManageReviewCard = ({ review, refetch }) => {
  const axiosSecure = useAxiosSecure();

  function handelReviewDelete() {
    showConfirmDialog("Are you sure to delete this review?", "Delete id").then(
      (res) => {
        if (res.isConfirmed) {
          axiosSecure
            .delete(`/api/review/${review?._id}`)
            .then((res) => {
              if (res.data.deletedCount) {
                refetch();
                showSuccessToast("Review delete successfully");
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
    <div className="border border-base-200 p-4 flex flex-col gap-3 text-dark-01 rounded-xl">
      <div className="flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-3">
          <img
            src={review?.reviewerImage}
            className="w-14 h-14 rounded-full object-cover"
            alt=""
          />
          <div>
            <h2 className="font-semibold text-lg text-gray-700">
              {review?.reviewerName}
            </h2>
            <p>{review?.reviewerEmail}</p>
          </div>
        </div>
        <hr className="border-base-200" />
        <p className="text-gray-500">{review?.review}</p>
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

ManageReviewCard.propTypes = {
  review: PropTypes.object,
  refetch: PropTypes.func,
};

export default ManageReviewCard;
