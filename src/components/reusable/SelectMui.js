import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const SelectMui = ({ name, value, setValue, options }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  console.log(options);

  return (
    <FormControl variant="outlined" className="selectMui">
      <InputLabel id={`${name}-select-standard-label`}>{name}</InputLabel>

      <Select
        id={`${name}-id`}
        value={value}
        label={name}
        onChange={handleChange}
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

export default SelectMui;
