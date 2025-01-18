import moment from "moment";
import PropTypes from "prop-types";

const UserReviewCard = ({ review }) => {
  const { review: reviewText, property, reviewTimestamp } = review;

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
      <button className="btn w-full text-white bg-deleteColor border-none hover:bg-deleteColor">
        Delete
      </button>
    </div>
  );
};

UserReviewCard.propTypes = {
  review: PropTypes.object,
};

export default UserReviewCard;
