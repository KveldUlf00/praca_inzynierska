import Button from "@mui/material/Button";

const ButtonMui = ({ title, onClick }) => {
  //   <Button variant="contained" component="label">
  //     Upload
  //     <input hidden accept="image/*" multiple type="file" />
  //   </Button>;

  return (
    <Button variant="contained" onClick={onClick}>
      {title}
    </Button>
  );
};

export default ButtonMui;
