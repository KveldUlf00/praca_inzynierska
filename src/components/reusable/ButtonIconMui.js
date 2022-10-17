import PropTypes from "prop-types";

import IconButton from "@mui/material/IconButton";

const ButtonMui = ({ icon, title, onClick, id }) => {
  return (
    <IconButton variant="contained" onClick={onClick} id={id}>
      {icon} {title}
    </IconButton>
  );
};

ButtonMui.propTypes = {
  icon: PropTypes.object.isRequired,
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string,
};

ButtonMui.defaultProps = {
  title: "",
  id: "typical-id",
};

export default ButtonMui;
