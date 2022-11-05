import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import SelectMui from "../reusable/SelectMui";

const Dependency = ({ data, dependencyNode, setDependencyNode }) => {
  const [selectOptions, setSelectOptions] = useState([]);

  const ColorScale = require("color-scales");

  const colorScale = new ColorScale(0, 100, ["#ff0000", "#009933"], 1);

  const generateScale = () => {
    const res = [];

    for (let i = 0; i < 101; i++) {
      res.push(
        <div
          key={i}
          className="cube"
          style={{ backgroundColor: colorScale.getColor(i).toHexString() }}
        ></div>
      );
    }
    return res;
  };

  useEffect(() => {
    setSelectOptions(
      data.nodes
        .map((elem) => ({ name: elem.name, value: elem.index }))
        .concat({ name: "Reset", value: -1 })
    );
  }, [data]);

  return (
    <div className="dependency">
      <div>
        <p>Select node to check dependency: </p>
        <SelectMui
          name="Choose node"
          value={dependencyNode}
          setValue={setDependencyNode}
          options={selectOptions}
        />
      </div>
      <div>
        <p>Degree of dependency: </p>
        <div className="dependency-box">
          <div className="dependency-scale">{generateScale()}</div>
          <div className="dependency-desc">
            <span>Low</span>
            <span>Medium</span>
            <span>High</span>
          </div>
        </div>
      </div>
    </div>
  );
};

Dependency.propTypes = {
  data: PropTypes.object.isRequired,
  dependencyNode: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  setDependencyNode: PropTypes.func.isRequired,
};

export default Dependency;
