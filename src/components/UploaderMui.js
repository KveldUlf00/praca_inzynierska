import Button from "@mui/material/Button";

const FileGetter = ({ title, onChange }) => {
  return (
    <Button variant="contained" component="label">
      {title}
      <input type="file" id="file" name="file" hidden onChange={onChange} />
    </Button>
  );
};

export default FileGetter;
