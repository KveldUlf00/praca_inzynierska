import { useEffect, useState } from "react";
import SelectMui from "../reusable/SelectMui";

const Dependency = ({ data, dependencyNode, setDependencyNode }) => {
  const [selectOptions, setSelectOptions] = useState([]);
  console.log("Dependency");

  useEffect(() => {
    setSelectOptions(
      data.nodes
        .map((elem) => ({ name: elem.name, value: elem.index }))
        .concat({ name: "Reset", value: -1 })
    );
  }, [data]);

  // useEffect(() => {
  //   console.log("---------------------");
  //   console.log(selectOptions);
  //   console.log(
  //     "tak czy nie?",
  //     !selectOptions.some((elem) => elem === { name: "Reset", value: -1 })
  //   );
  //   if (
  //     selectOptions.length > 0 &&
  //     !selectOptions.some((elem) => elem === { name: "Reset", value: -1 })
  //   ) {
  //     setSelectOptions((prev) => prev.concat({ name: "Reset", value: -1 }));
  //   }
  // }, [selectOptions]);

  console.log("selectOptions", selectOptions);
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

export default Dependency;
