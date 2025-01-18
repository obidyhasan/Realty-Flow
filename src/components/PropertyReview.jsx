import PropTypes from "prop-types";

const PropertyReview = ({ userReview }) => {
  const { reviewerName, reviewerImage, review } = userReview;

  return (
    <div className="border border-base-200 rounded-lg p-4">
      <div className="flex items-center gap-3">
        <img
          src={reviewerImage}
          className="w-10 h-10 rounded-full object-cover"
          alt=""
        />
        <h2 className="font-semibold text-lg">{reviewerName}</h2>
      </div>
      <p className="mt-3">{`"${review}"`}</p>
    </div>
  );
};

PropertyReview.propTypes = {
  userReview: PropTypes.object,
};

export default PropertyReview;
