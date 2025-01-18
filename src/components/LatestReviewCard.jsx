import PropTypes from "prop-types";

const LatestReviewCard = ({ review }) => {
  return (
    <div className="border border-base-200 p-4 flex flex-col gap-3 text-dark-01 rounded-xl">
      <div className="flex items-center gap-3">
        <img
          src={review.reviewerImage}
          className="w-12 h-12 rounded-full object-cover"
          alt=""
        />
        <h2 className="font-semibold text-lg text-gray-700">
          {review?.reviewerName}
        </h2>
      </div>
      <hr className="border-base-200" />
      <h1 className="text-xl font-semibold">{review?.property[0].title}</h1>
      <p className="text-gray-500">{review?.review}</p>
    </div>
  );
};

LatestReviewCard.propTypes = {
  review: PropTypes.object,
};

export default LatestReviewCard;
