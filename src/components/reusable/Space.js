import PropTypes from "prop-types";

const Space = ({ title }) => {
  return <div className="space">{title}</div>;
};

Space.propTypes = {
  title: PropTypes.string,
};

Space.defaultProps = {
  title: "",
};

export default Space;
