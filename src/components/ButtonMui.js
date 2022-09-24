import PropTypes from "prop-types";

import Button from "@mui/material/Button";

const ButtonMui = ({ title, onClick }) => {
  return (
    <Button variant="contained" onClick={onClick}>
      {title}
    </Button>
  );
};

ButtonMui.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ButtonMui;
