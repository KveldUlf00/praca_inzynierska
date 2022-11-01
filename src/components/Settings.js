import PropTypes from "prop-types";
import axios from "axios";

import { Box, Popover, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

import ButtonMui from "./reusable/ButtonMui";
import ButtonIconMui from "./reusable/ButtonIconMui";
import UploaderMui from "./reusable/UploaderMui";
import Space from "./reusable/Space";
import { useState } from "react";

const Settings = ({ setData, fileName, setCliques, setFileName }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const openPopover = Boolean(anchorEl);
  const idPopover = openPopover ? "simple-popover" : undefined;

  const demonstrationData = {
    title: "Title of the network",
    nodes: [
      {
        name: "Andrzej",
        attributes: {
          attr1: 2,
          attr2: 4,
          attr3: 7,
        },
      },
      {
        name: "Basia",
        attributes: {
          attr1: 5,
          attr2: 2,
          attr3: 9,
        },
      },
      {
        name: "Krzysztof",
        attributes: {
          attr1: 7,
          attr2: 2,
          attr3: 3,
        },
      },
    ],
    connections: [
      ["Andrzej", "Basia"],
      ["Basia", "Krzysztof"],
      ["Krzysztof", "Andrzej"],
    ],
  };

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
        setCliques(res.data?.cliques);
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
              fontStyle: "italic",
            }}
          >
            <pre id="json">
              {JSON.stringify(demonstrationData, undefined, 2)}
            </pre>
          </Box>
          <Typography sx={{ p: 1 }}>
            As you can see the file format is the json. If You are not familiar
            to such a format, I suggest you to use{" "}
            <a
              className="styled-link"
              href="https://jsonlint.com/"
              target="_blank"
              rel="noreferrer"
            >
              this page
            </a>{" "}
            to make sure about correct format.
          </Typography>
          <Typography sx={{ p: 1 }}>
            Attributes in nodes will be used to calculate correlation, that's
            why their values have to be numeric non string.
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
  setCliques: PropTypes.func.isRequired,
  setFileName: PropTypes.func.isRequired,
};

// Settings.defaultProps = {
//   setData: () => {},
// };

export default Settings;
