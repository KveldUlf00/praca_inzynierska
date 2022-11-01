import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import SelectMui from "../reusable/SelectMui";

const Dependency = ({ data, dependencyNode, setDependencyNode }) => {
  const [selectOptions, setSelectOptions] = useState([]);

  useEffect(() => {
    setSelectOptions(
      data.nodes
        .map((elem) => ({ name: elem.name, value: elem.index }))
        .concat({ name: "Reset", value: -1 })
    );
  }, [data]);

  return (
    <div className="dependency">
      <p>Select node to check dependency: </p>
      <SelectMui
        name="Choose node"
        value={dependencyNode}
        setValue={setDependencyNode}
        options={selectOptions}
      />
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
