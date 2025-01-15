import PropTypes from "prop-types";

const TitleSection = ({ title, description }) => {
  return (
    <div className="text-center">
      <h1 className="font-bold  sm:text-3xl text-2xl ">{title}</h1>
      <p className="max-w-xl mx-auto mt-2 sm:mt-3 sm:text-sm text-xs">
        {description}
      </p>
    </div>
  );
};

TitleSection.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default TitleSection;
