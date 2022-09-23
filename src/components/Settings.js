import PropTypes from "prop-types";

import { useState } from "react";
import ButtonMui from "./ButtonMui";
import Space from "./Space";

const Settings = ({ setData }) => {
  const [fileName, setFileName] = useState("");

  const handleProvideData = () => {
    // API get data - give file to generate data
    console.log("Providing Data!");
    setData({
      nodes: [
        { name: "Alice", group: 1 },
        { name: "Bob", group: 1 },
        { name: "Chen", group: 2 },
        { name: "Dawg", group: 1 },
        { name: "Ethan", group: 2 },
        { name: "George", group: 1 },
        { name: "Frank", group: 1 },
        { name: "Hanes", group: 1 },
      ],
      links: [
        { source: "Alice", target: "Bob", value: 1 },
        { source: "Alice", target: "Dawg", value: 2 },
        { source: "Alice", target: "Chen", value: 3 },
        { source: "Alice", target: "Frank", value: 4 },
        { source: "Alice", target: "George", value: 5 },
        { source: "Alice", target: "Ethan", value: 6 },
        { source: "Alice", target: "Hanes", value: 6 },
      ],
    });
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
  setData: PropTypes.func.isRequired,
};

// Settings.defaultProps = {
//   setData: () => {},
// };

export default Settings;
