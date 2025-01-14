import PropTypes from "prop-types";

const Headline = ({ headline, subHeadline }) => {
  return (
    <div className="text-center">
      <h1 className="font-bold text-4xl">{headline}</h1>
      <p className="max-w-2xl mx-auto mt-3">{subHeadline}</p>
    </div>
  );
};

Headline.propTypes = {
  headline: PropTypes.string,
  subHeadline: PropTypes.string,
};

export default Headline;
