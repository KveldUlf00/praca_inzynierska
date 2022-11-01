import PropTypes from "prop-types";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const SelectMui = ({ name, value, setValue, options, className }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl variant="outlined" className="selectMui">
      <InputLabel id={`${name}-select-standard-label`}>{name}</InputLabel>

      <Select
        id={`${name}-id`}
        value={value}
        label={name}
        onChange={handleChange}
        className={className}
      >
        {options.map((option) => (
          <MenuItem key={option.name} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

SelectMui.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  className: PropTypes.string,
};

SelectMui.defaultProps = {
  className: "",
};

export default SelectMui;
