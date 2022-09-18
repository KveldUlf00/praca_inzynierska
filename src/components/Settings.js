import PropTypes from "prop-types";

import { useState } from "react";
import ButtonMui from "./ButtonMui";
import Space from "./Space";

const Settings = ({ setData }) => {
  const [fileName, setFileName] = useState("");

  const handleProvideData = () => {
    // API get data - give file to generate data
    console.log("Providing Data!");
    setFileName("Draft file name");
  };

  const handleCleanData = () => {
    // reset data
    console.log("Reseting Data!");
    setData({});
    setFileName("");
  };

  return (
    <div className="settings-component">
      <Space />
      <p>Firstly provide data necessary to generate network</p>
      <ButtonMui title="Provide data" onClick={handleProvideData} />
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
  cleanData: PropTypes.func.isRequired,
};

// Settings.defaultProps = {
//   cleanData: () => {},
// };

export default Settings;
