import PropTypes from "prop-types";
import axios from "axios";

import { Box, Popover, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import ButtonMui from "./ButtonMui";
import ButtonIconMui from "./ButtonIconMui";
import UploaderMui from "./UploaderMui";
import Space from "./Space";
import { useState } from "react";

const Settings = ({ setData, fileName, setFileName }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const openPopover = Boolean(anchorEl);
  const idPopover = openPopover ? "simple-popover" : undefined;

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const provideFile = () => {
    const formData = new FormData();
    const file = document.querySelector("#file");

    formData.append("file", file.files[0]);
    axios
      .create()
      .post("http://127.0.0.1:5000/file", formData)
      .then((res) => {
        setData(res.data?.network);
        setFileName(res.data?.fileName);
      })
      .catch((err) => console.error(err))
      .finally(() => console.log("reloading"));
  };

  const handleCleanData = () => {
    // reset data
    console.log("Reseting Data!");
    setData({});
    setFileName("");
  };

  return (
    <div className="settings-component">
      <Popover
        id={idPopover}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Box sx={{ minWidth: 100, textAlign: "center", margin: 3 }}>
          <Typography variant="h6" sx={{ p: 1 }}>
            Acceptable text format in file
          </Typography>
          <Box
            sx={{
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            <p>Adam: Ewa, Joanna</p>
            <p>Ewa: Joanna</p>
            <p>Joanna: Krzysiek</p>
            <p>Karol: Krzysiek, Ewa</p>
            <p>Krzysiek: Adam</p>
          </Box>
          <Typography sx={{ p: 1 }}>
            Remember, that all children (for example: "Ewa, Joanna") after colon
            have to exist in parents (names before colon, such as "Adam", or
            "Ewa"){" "}
          </Typography>
        </Box>
      </Popover>
      <Space />
      <p className="displayFlex">
        Firstly provide data necessary to generate network{" "}
        <ButtonIconMui
          icon={<InfoIcon sx={{ color: "#fff" }} />}
          id={idPopover}
          onClick={handleOpen}
        />
      </p>
      <UploaderMui title="Provide data" onChange={provideFile} />
      {fileName && (
        <p>
          Data generated from file: <b>{fileName}</b>
        </p>
      )}
      <Space />
      <ButtonMui title="Clean data" onClick={handleCleanData} />
    </div>
  );
};

Settings.propTypes = {
  setData: PropTypes.func.isRequired,
  fileName: PropTypes.string.isRequired,
  setFileName: PropTypes.func.isRequired,
};

// Settings.defaultProps = {
//   setData: () => {},
// };

export default Settings;
