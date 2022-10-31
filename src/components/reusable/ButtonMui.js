import PropTypes from "prop-types";

import Button from "@mui/material/Button";

const ButtonMui = ({ title, onClick, chosen }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      title={title}
      alt={title}
      color={chosen ? "warning" : "primary"}
    >
      {title}
    </Button>
  );
};

ButtonMui.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  chosen: PropTypes.bool,
};

ButtonMui.defaultProps = {
  chosen: false,
};

export default ButtonMui;
