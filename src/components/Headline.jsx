import PropTypes from "prop-types";

const Headline = ({ headline, subHeadline }) => {
  return (
    <div className="text-center">
      <h1 className="font-bold sm:text-3xl text-2xl ">{headline}</h1>
      <p className="max-w-2xl mx-auto mt-2 sm:mt-3 sm:text-sm text-xs">
        {subHeadline}
      </p>
    </div>
  );
};

Headline.propTypes = {
  headline: PropTypes.string,
  subHeadline: PropTypes.string,
};

export default Headline;
