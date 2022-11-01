import PropTypes from "prop-types";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="tab-content"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
};

TabPanel.propTypes = {
  props: PropTypes.object,
};

TabPanel.defaultProps = {
  props: {},
};

export default TabPanel;
